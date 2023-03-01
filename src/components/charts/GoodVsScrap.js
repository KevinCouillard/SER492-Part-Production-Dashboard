import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Axios from "axios";
import { useState } from "react";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
let targetSum =0;

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Good and Scrap Product',
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

const labels = ['9/1', '9/2', '9/3', '9/4', '9/5'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Good',
      data: [40,35,42,31,50],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Scrap',
      data: [3,4,2,6,2],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
  ],
};

export function GoodVsScrap() {
    const [trackingList, setTrackingList] = useState([]);
    const url = "http://localhost:4000";
  
    const getTracking = () => {
      Axios.get(url + "/tracking")
        .then((response) => {
          setTrackingList(response.data);
        })
        .catch((err) => console.log(err));
    };
    const target = trackingList.map((x) => x.target);
  
    target.forEach((value) => {
      targetSum += value;
    });
    console.log(targetSum);
    getTracking();
    return <Bar data={data} />;
  }
  
  export default GoodVsScrap;
  
