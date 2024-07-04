"use client"

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register
  (ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 2500, 3750],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#F79F1F', '#949494'],
            }
        ],
        labels: ['Bank 1', 'Bank 2', 'Bank3']
    }
  return 
<Doughnut 
data={data} 
options={{
    cutout: '60%',
    plugins: {
        legend: {
            display: false
        }
    }
}}
/>
  
}

export default DoughnutChart