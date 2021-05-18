import React, { useState, useEffect } from 'react';
import { Button, Dropdown, FormControl, Row, Col, ListGroup, Badge } from "react-bootstrap";


import Chart from "chart.js";
import SendIcon from '@material-ui/icons/Send';

export default function App() {
  const [count, setCount] = useState(0);
  const [receivedMessage, setReceivedMessage] = useState("Nothing received!");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    window.SerialAPI.read((data) => {
      if(data !== "badr") {
        setReceivedMessage(data);
        return ;
      }

      setReceivedMessage("badr was sent as message");
    })
  }, []);

  const chartProps = {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# colors',
                data: [12, 19, 3, 5, count, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

  return (
    <div className="m-5">
      <h1> 
        Electron/React App 
        <Badge className="ml-5" variant="secondary">{(isConnected) ? "connected" : "disconnected"}</Badge>
      </h1>
      <Button onClick={() => window.SerialAPI.open2(() => setIsConnected(true))}>Connect</Button>
      <Button variant="danger" onClick={() => window.SerialAPI.close(() => setIsConnected(false))}>Disconnect</Button>

      <Dropdown.Divider />

      <AvailablePortsComponent />

      <SerialComponent />

      <Dropdown.Divider className="mt-5"/>
      <Button 
        onClick={() => setCount(count + 1)}
        >
          Increse Purple
      </Button>

      <ChartComponent id="123abc" height="100" chartProps={chartProps}/>
    </div>
  )
}


function ChartComponent(props) {
  const containerId = "static-container-chart-component";
  const height = props.height;
  const width = props.width;
  const chartProps = props.chartProps;

  const chartId = props.id;

  const mountingFunction = () => {
    const containerElement = document.getElementById(containerId);
    containerElement.innerHTML = `<canvas id=${chartId} width=${width} height=${height}></canvas>`;

    window.MyChart = new Chart(chartId, chartProps);
  }

  useEffect(() => {
    mountingFunction();

    return () => {
      const chartElement = document.getElementById(chartId);

      if(chartElement) {
        chartElement.remove();
      }
    }
  }, [chartProps])

  return <div id={containerId}></div>
}


function SerialComponent(props) {
  const [receivedMessage, setReceivedMessage] = useState("Nothing received!");
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    window.SerialAPI.read((data) => {
      setReceivedMessage(data);
    })
  }, []);

  return (
    <div>
      <Row className="mb-3">
          <Col xs={8}>
            <FormControl 
              type="text"
              value={messageToSend}
              onChange={({ target }) => setMessageToSend(target.value)} 
              />
          </Col>
          <Col xs={2}>
            <Button 
              onClick={() => {window.SerialAPI.send(messageToSend);}} 
              variant="info"
              >
                Send <SendIcon fontSize="small" />
            </Button>
          </Col>
      </Row>

      <h4>{"Received message: "}{receivedMessage}</h4>
    </div>
  );
}

export function AvailablePortsComponent(props) {
  const [arrPorts, setArrPorts] = useState(['test']);

  return(
    <Row>
      <Col>
        <Button onClick={() => window.SerialAPI.availablePorts(setArrPorts)}>Refresh</Button>
        <Button variant="warning" onClick={() => window.SerialAPI.changePortName("COM5")}>Change port</Button>

        <ListGroup>
          {arrPorts.map((portName, i) =>
            <ListGroup.Item key={`portname-${i}`}>{portName}</ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
}