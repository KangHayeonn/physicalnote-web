import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: {
    labels: any[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  options: {
    responsive: boolean;
    plugins: {
      legend: {
        position: string;
      };
      title: {
        display: boolean;
        text: string;
      };
    };
  };
}

const Chart = ({ data, options }: ChartProps) => {
  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
