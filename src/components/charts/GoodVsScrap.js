import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GoodVsScrap = () => {
  const [trackingList, setTrackingList] = useState([]);
  const good = trackingList.map((x) => x.good);
  const bad = trackingList.map((x) => x.bad);
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
        text: "Good and Scrap Product",
      },
    },
    responsive: true,
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
    labels: ["9/1", "9/2", "9/3", "9/4", "9/5"],
    datasets: [
      {
        label: "Good",
        data: [good[0], good[1], good[2], good[3], good[4]],
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Scrap",
        data: [bad[0], bad[1], bad[2], bad[3], bad[4]],
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default GoodVsScrap;
