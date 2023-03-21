import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PieChart from "../components/charts/PieChart.js";
import FinishedProduct from "../components/charts/FinishedProduct.js";
import TargetAndActual from "../components/charts/TargetAndActual.js";
import AverageScrap from "../components/charts/AverageScrap.js";
import AverageDowntime from "../components/charts/AverageDowntime.js";
import GoodVsScrap from "../components/charts/GoodVsScrap.js";
import "./dashboard.css";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {

  const [product, setProduct] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [graphState, setGraphState] = useState("Tabular");

  
  const handleGraphToggle = (newValue) => {
    if (graphState === "Tabular") {
      setGraphState("Graphical");
    } else if (graphState === "Graphical") {
      setGraphState("Tabular");
    }
  };

  return (
    <div>
      <Container fluid>
        <Row id="filterRow">
          <Col className="filterCols" xs={2}>
            <Select className="product" id="dropdown" value={product} placeholder="Product 1" onChange={(event) => {
                setProduct(event.target.value);
              }}>
              <MenuItem value="Product 1">Product 1</MenuItem>
              <MenuItem value="Product 2">Product 2</MenuItem>
              <MenuItem value="Product 3">Product 3</MenuItem>
            </Select>
          </Col>
          <Col className="filterCols" xs={2}>
            <Select className="month" id="dropdown" value={month} placeholder="January" onChange={(event) => {
                setMonth(event.target.value);
              }}>
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="Febuary">Febuary</MenuItem>
              <MenuItem value="March">March</MenuItem>
            </Select>
          </Col>
          <Col className="filterCols" xs={2}>
            <Select className="week" id="dropdown" value={week} placeholder="Week 1" onChange={(event) => {
                setWeek(event.target.value);
              }}>
              <MenuItem value="Week 1">Week 1</MenuItem>
              <MenuItem value="Week 2">Week 2</MenuItem>
              <MenuItem value="Week 3">Week 3</MenuItem>
              <MenuItem value="Week 4">Week 4</MenuItem>
            </Select>
          </Col>
          <Col className="filterCols" xs={2}>
            <Select className="day" id="dropdown" value={day} placeholder="Day 1" onChange={(event) => {
                setDay(event.target.value);
              }}>
              <MenuItem value="Day 1">Day 1</MenuItem>
              <MenuItem value="Day 2">Day 2</MenuItem>
              <MenuItem value="Day 3">Day 3</MenuItem>
              <MenuItem value="Day 4">Day 4</MenuItem>
              <MenuItem value="Day 5">Day 5</MenuItem>
              <MenuItem value="Day 6">Day 6</MenuItem>
              <MenuItem value="Day 7">Day 7</MenuItem>
            </Select>
          </Col>
          <Col>
            <button type="button" id="toggleBtn" class="btn btn-primary" value={graphState} data-toggle="button" aria-pressed="false" autocomplete="off" onClick={handleGraphToggle}>
                {graphState}
            </button>
          </Col>
        </Row>
        <Row>
          <Col className="graphs">
            <h6>Finished vs Rework vs Scrap Products</h6> <PieChart />
          </Col>
          <Col className="graphs">
            <h6>Number of Finished Products</h6>
            <FinishedProduct />
          </Col>
          <Col className="graphs">
            {" "}
            <h6>Target vs Actual Products</h6>
            <TargetAndActual />
          </Col>
        </Row>
        <Row>
          <Col className="graphs">
            {" "}
            <h6>Average Amount of Scrap by Cell</h6>
            <AverageScrap />
          </Col>
          <Col className="graphs">
            <h6>Average Amount of Downtime by Cell</h6>
            <AverageDowntime />
          </Col>
          <Col className="graphs">
            {" "}
            <h6>Good vs Scrap Product</h6>
            <GoodVsScrap />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
