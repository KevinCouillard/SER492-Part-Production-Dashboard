import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import { useState, useEffect } from "react";
import faker from "faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const FinishedProduct = () => {
  const [trackingList, setTrackingList] = useState([]);

  const cActual = trackingList.map((x) => x.cActual);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");
      setTrackingList(result.data);
    };

    fetchData();
  }, []);
  var options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Finished Products",
      },
    },
  };
  const labels = [
    "10:00AM-11:00AM",
    "11:00AM-12:00PM",
    "12:00PM-1:00PM",
    "1:00PM-2:00PM",
    "2:00PM-3:00PM",
    "3:00PM-4:00PM",
    "4:00PM-5:00PM",
  ];
  var data = {
    labels,
    datasets: [
      {
        label: "Finished Products",
        data: [cActual[0], cActual[1], cActual[2], cActual[3], cActual[4]],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default FinishedProduct;

// let targetSum = 0;

// export const options = {
//   responsive: true,
//   plugins: {
//     title: {
//       display: true,
//       text: "Finished Products",
//     },
//   },
// };

// const labels = [
//   "10:00AM-11:00AM",
//   "11:00AM-12:00PM",
//   "12:00PM-1:00PM",
//   "1:00PM-2:00PM",
//   "2:00PM-3:00PM",
//   "3:00PM-4:00PM",
//   "4:00PM-5:00PM",
// ];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Finished Products",
//       data: [78, 62, 57, 83, 72, 65, 70],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

// export function FinishedProduct() {
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
//   return <Line data={data} />;
// }

// export default FinishedProduct;
