import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Leads',
      backgroundColor: '#0d6efd',
      data: [12, 19, 8, 15, 10, 14],
    },
    {
      label: 'Converted',
      backgroundColor: '#198754',
      data: [5, 9, 4, 7, 6, 8],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

function DashboardChart() {
  return <Bar data={data} options={options} />;
}

export default DashboardChart;
