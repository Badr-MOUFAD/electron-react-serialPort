import React, { useState } from 'react';
import { Button, Dropdown, FormControl, Row, Col, ListGroup, Badge } from "react-bootstrap";

import { ChartComponent } from './components/ChartComponent';


export default function App() {
  const [count, setCount] = useState(0);
  const [selectedFile, setSelelectedFile] = useState("no selected file");

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
        Electron/React App Test
        <Badge className="ml-5" variant="secondary">{(false) ? "connected" : "disconnected"}</Badge>
      </h1>

      <div className="mt-5">
        <Button className="mr-2" onClick={() => setCount(count + 1)}>Increase purple</Button>
        <Button onClick={() => window.UploadAPI.openDialog((f)=>setSelelectedFile(f))}>Open file dialog</Button>
      </div>

      <div className="my-1 font-italic text-muted">{selectedFile}</div>

      <ChartComponent id="123abc" height="100" chartProps={chartProps}/>
    </div>
  )
}
