import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PieChart from "../components/charts/PieChart.js";
import FinishedProduct from "../components/charts/FinishedProduct.js";
import TargetAndActual from "../components/charts/TargetAndActual.js";
import AverageScrap from "../components/charts/AverageScrap.js";
import AverageDowntime from "../components/charts/AverageDowntime.js";
import GoodVsScrap from "../components/charts/GoodVsScrap.js";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Container fluid>
      <Row>
        <Col className="graphs"><h6>Finished vs Rework vs Scrap Products</h6> <PieChart /></Col>
        <Col className="graphs"><h6>Number of Finished Products</h6><FinishedProduct/>
        </Col>
        <Col className="graphs"> <h6>Target vs Actual Products</h6><TargetAndActual/></Col>
      </Row>
      <Row>
        <Col className="graphs"> <h6>Average Amount of Scrap by Cell</h6><AverageScrap/></Col>
        <Col className="graphs"><h6>Average Amount of Downtime by Cell</h6><AverageDowntime/></Col>
        <Col className="graphs"> <h6>Good vs Scrap Product</h6><GoodVsScrap/></Col>
      </Row>
        
      </Container>
    </div>
    
  );
};

export default Dashboard;
