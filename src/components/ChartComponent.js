import React, { useEffect } from "react";
import Chart from "chart.js";


export function ChartComponent(props) {
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