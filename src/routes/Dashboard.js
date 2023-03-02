import React from "react";
import PieChart from "../components/charts/PieChart.js";
import FinishedProduct from "../components/charts/FinishedProduct.js";
import TargetAndActual from "../components/charts/TargetAndActual.js";
import AverageScrap from "../components/charts/AverageScrap.js";
import AverageDowntime from "../components/charts/AverageDowntime.js";
import GoodVsScrap from "../components/charts/GoodVsScrap.js";
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <PieChart />
      {/* <FinishedProduct/> */}
      {/* <TargetAndActual/> */}
      {/* <AverageScrap/> */}
      {/* <AverageDowntime/> */}
      <GoodVsScrap />
    </div>
  );
};

export default Dashboard;
