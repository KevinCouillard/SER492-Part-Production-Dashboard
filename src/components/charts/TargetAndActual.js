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
const TargetAndActual = () => {
  const [trackingList, setTrackingList] = useState([]);
  const cTarget = trackingList.map((x) => x.cTarget);
  const cActual = trackingList.map((x) => x.cActual);
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
        text: "C-Ring Forming - Average Scrap Rate By Shift",
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
        label: "Target",
        data: [cTarget[0], cTarget[1], cTarget[2], cTarget[3], cTarget[4]],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Actual",
        data: [cActual[0], cActual[1], cActual[2], cActual[3], cActual[4]],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default TargetAndActual;
// let targetSum = 0;

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: "C-Ring Forming - Average Scrap Rate By Shift",
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
//       label: "Target",
//       data: [300, 450, 375, 400, 381],
//       backgroundColor: "rgb(255, 99, 132)",
//     },
//     {
//       label: "Actual",
//       data: [264, 424, 352, 400, 360],
//       backgroundColor: "rgb(53, 162, 235)",
//     },
//   ],
// };

// export function TargetAndActual() {
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

// export default TargetAndActual;
