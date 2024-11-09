import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketChart = ({ market }) => {
  const customGridLines = {
    id: 'customGridLines',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;
      const xAxis = chart.scales.x;

      chart.data.datasets.forEach((dataset, index) => {
        const yValue = yAxis.getPixelForValue(dataset.data[dataset.data.length - 1]);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.left, yValue);
        ctx.lineTo(xAxis.right, yValue);
        ctx.lineWidth = 1;
        ctx.strokeStyle = dataset.borderColor;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = dataset.borderColor;
        ctx.font = "12px Arial";
        ctx.fillText(dataset.label, xAxis.right + 5, yValue + 3);
      });
    },
  };

  ChartJS.register(customGridLines);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  useEffect(() => {
    if (market) {
      const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
      const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return days[date.getDay()];
      });

      const datasets = market.outcomes.map((option, index) => {
        return {
          label: option.name,
          data: [
            ...Array.from({ length: 6 }, () => Math.random() * option.odds),
            option.odds,
          ],
          fill: false,
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length].replace("0.2", "1"),
        };
      });

      setChartData({ labels, datasets });
      setLoading(false);
    }
  }, [market]);

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-1/2 p-4 rounded-lg bg-white">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MarketChart;
