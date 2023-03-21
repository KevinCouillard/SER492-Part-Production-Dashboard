import "./App.css";

import Dashboard from "./routes/Dashboard";
import Users from "./routes/Users";
import Products from "./routes/Products";
import Safety from "./routes/Safety";
import Tracking from "./routes/Tracking";
import Ptracking from "./routes/Ptracking";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quality from "./routes/Quality";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState();

  const openSidebar = () => {
    setSideWidth("240px");
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSideWidth("174px");
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Container fluid className="screenContainer">
        <Row className="navContainer">
          <Col className="navBar">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          </Col>
        </Row>
        <Row className="mainContainer">
          <Col md={2} id="sidebar" className="sideBar" style={{width: '174px'}}>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </Col>
          <Col md={10} className="screen">
            <Routes id="Test">
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/Ptracking" element={<Ptracking />} />
              <Route path="/quality" element={<Quality />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      {/* <div className="container">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/quality" element={<Quality />} />
        </Routes>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div> */}
    </Router>
  );
};

export function test() {
  document.getElementById("sidebar").style.width = '200px';
}

export function test2() {
  document.getElementById("sidebar").style.width = '240px'
}

export default App;
