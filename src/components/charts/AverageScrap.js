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
const AverageScrap = () => {
  const [trackingList, setTrackingList] = useState([]);
  const bad = trackingList.map((x) => x.bad);
  const target = trackingList.map((x) => x.target);
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
        text: "C-Ring Forming - Average Downtime By Shift",
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
        label: "Percent of scrap",
        data: [
          bad[0] / target[0],
          bad[1] / target[1],
          bad[2] / target[2],
          bad[3] / target[3],
          bad[4] / target[4],
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default AverageScrap;
// let targetSum = 0;

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: "C-Ring Forming - Average Downtime By Shift",
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
//       label: "Percent of scrap",
//       data: [0.75, 0.8, 1.0, 0.7, 0.81],
//       backgroundColor: "rgb(255, 99, 132)",
//     },
//   ],
// };

// export function AverageScrap() {
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

// export default AverageScrap;
