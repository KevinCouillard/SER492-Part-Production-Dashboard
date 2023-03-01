import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Axios from "axios";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
let targetSum = 0;
export const data = {
  labels: ["Finished Parts", "Reworked Parts", "Scrap"],
  datasets: [
    {
      label: "# of Parts",
      data: [targetSum, 19, 3],
      backgroundColor: [
        "rgba(54, 235, 102, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "#36eb39",
        "rgba(255, 206, 86, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
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
  return <Pie data={data} />;
}

export default PieChart;
