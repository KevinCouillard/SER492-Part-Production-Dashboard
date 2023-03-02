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
// let targetSum = 0;

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: "C-Ring Forming - Average Cumulative Production By Shift",
//     },
//   },
//   responsive: true,
//   interaction: {
//     intersect: false,
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
// };

// const labels = ["C1", "C2", "C3", "C4", "Mean"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Minutes of Downtime",
//       data: [20, 15, 32, 10, 19.25],
//       backgroundColor: "rgb(255, 99, 132)",
//     },
//   ],
// };

// export function AverageDowntime() {
//   const [trackingList, setTrackingList] = useState([]);
//   const url = "http://localhost:4000";

//   const getTracking = () => {
//     Axios.get(url + "/tracking")
//       .then((response) => {
//         setTrackingList(response.data);
//       }, [])
//       .catch((err) => console.log(err));
//   };
//   const target = trackingList.map((x) => x.target);

//   target.forEach((value) => {
//     targetSum += value;
//   });
//   console.log(targetSum);
//   getTracking();
//   return <Bar data={data} />;
// }

// export default AverageDowntime;
