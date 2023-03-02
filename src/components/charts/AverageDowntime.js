import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Axios from "axios";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AverageDowtime = () => {
  const [trackingList, setTrackingList] = useState([]);

  const downTime = trackingList.map((x) => x.downTime);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");
      setTrackingList(result.data);
    };

    fetchData();
  }, []);
  var options = {
    plugins: {
      title: {
        display: true,
        text: "C-Ring Forming - Average Cumulative Production By Shift",
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  var data = {
    labels: ["C1", "C2", "C3", "C4", "Mean"],
    datasets: [
      {
        label: "Minutes of Downtime",
        data: [downTime[0], downTime[1], downTime[2], downTime[3], downTime[4]],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default AverageDowtime;
