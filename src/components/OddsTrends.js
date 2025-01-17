import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-moment';

// Register the required components
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OddsTrends = ({ trends = [] }) => {
  const data = {
    labels: trends.map(trend => trend.timestamp),
    datasets: [
      {
        label: 'Team 1 Odds',
        data: trends.map(trend => trend.team1Odds),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Team 2 Odds',
        data: trends.map(trend => trend.team2Odds),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute'
        }
      }
    }
  };
  const chartStyle = {
    maxHeight: '300px',
    maxWidth: '600px',
  };

  return (
    <div style={chartStyle} className='mb-3 ml-10 rounded-md'>
      <h3 className="text-lg font-semibold">Odds Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default OddsTrends;
