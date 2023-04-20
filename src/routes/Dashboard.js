import React, { useEffect } from "react";
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
import Navbar from "../components/navbar/Navbar";
import NavbarM from "../components/navbar/NavbarM.js";
import Sidebar from "../components/sidebar/Sidebar.js";
import { useLocation } from "react-router-dom";

import { useState } from "react";
import Axios from "axios";



const Dashboard = () => {
  const [product, setProduct] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [graphState, setGraphState] = useState("Tabular");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState();

  const [isManager, setIsManager] = useState(false);
  const [userList, setUserList] = useState([]);

  const location = useLocation();

  const str = location.pathname;
  const newstr = str.replace("/dashboard", "");
  const laststr = newstr.replace("/", "");

  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(url + '/users')

      //setUserList(result.data.users);
      const user = result.data.users.find(user => user.email == laststr);
      console.log(user);
      setIsManager(user.isManager);
    };

    fetchData();
  }, []);

  // const user = userList.find(user => user.email == laststr);
  // console.log(user);

    
  // if (user && user.isManager == false) {
  //   setIsManager(false);
  //  } else {
  //   setIsManager(true);
  // }


  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleGraphToggle = (newValue) => {
    if (graphState === "Tabular") {
      setGraphState("Graphical");
    } else if (graphState === "Graphical") {
      setGraphState("Tabular");
    }
  };

  //handleNavbar();

  if (isManager == false) {
    return (
      <div>
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
            <Col md={8} className="screen">
              <Container fluid id="dashboard">
                <Row>
                  <Col className="graphs" xs={4}>
                    <h6>Finished vs Rework vs Scrap Products</h6> <PieChart />
                  </Col>
  
                  <Col className="graphs" xs={4}>
                    <h6>Number of Finished Products</h6>
                    <FinishedProduct />
                  </Col>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Target vs Actual Products</h6>
                    <TargetAndActual />
                  </Col>
                </Row>
                <Row>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Average Amount of Scrap by Cell</h6>
                    <AverageScrap />
                  </Col>
                  <Col className="graphs" xs={4}>
                    <h6>Average Amount of Downtime by Cell</h6>
                    <AverageDowntime />
                  </Col>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Good vs Scrap Product</h6>
                    <GoodVsScrap />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container fluid className="screenContainer">
          <Row className="navContainer">
            <Col className="navBar">
              <NavbarM sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            </Col>
          </Row>
          <Row className="mainContainer">
            <Col md={2} id="sidebar" className="sideBar" style={{width: '174px'}}>
              <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            </Col>
            <Col md={8} className="screen">
              <Container fluid id="dashboard">
                <Row>
                  <Col className="graphs" xs={4}>
                    <h6>Finished vs Rework vs Scrap Products</h6> <PieChart />
                  </Col>
  
                  <Col className="graphs" xs={4}>
                    <h6>Number of Finished Products</h6>
                    <FinishedProduct />
                  </Col>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Target vs Actual Products</h6>
                    <TargetAndActual />
                  </Col>
                </Row>
                <Row>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Average Amount of Scrap by Cell</h6>
                    <AverageScrap />
                  </Col>
                  <Col className="graphs" xs={4}>
                    <h6>Average Amount of Downtime by Cell</h6>
                    <AverageDowntime />
                  </Col>
                  <Col className="graphs" xs={4}>
                    {" "}
                    <h6>Good vs Scrap Product</h6>
                    <GoodVsScrap />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
//   return (
//     <div>
//       <Container fluid className="screenContainer">
//         <Row className="navContainer">
//           <Col className="navBar">
//             <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
//           </Col>
//         </Row>
//         <Row className="mainContainer">
//           <Col md={2} id="sidebar" className="sideBar" style={{width: '174px'}}>
//             <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
//           </Col>
//           <Col md={8} className="screen">
//             <Container fluid id="dashboard">
//               <Row>
//                 <Col className="graphs" xs={4}>
//                   <h6>Finished vs Rework vs Scrap Products</h6> <PieChart />
//                 </Col>

//                 <Col className="graphs" xs={4}>
//                   <h6>Number of Finished Products</h6>
//                   <FinishedProduct />
//                 </Col>
//                 <Col className="graphs" xs={4}>
//                   {" "}
//                   <h6>Target vs Actual Products</h6>
//                   <TargetAndActual />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col className="graphs" xs={4}>
//                   {" "}
//                   <h6>Average Amount of Scrap by Cell</h6>
//                   <AverageScrap />
//                 </Col>
//                 <Col className="graphs" xs={4}>
//                   <h6>Average Amount of Downtime by Cell</h6>
//                   <AverageDowntime />
//                 </Col>
//                 <Col className="graphs" xs={4}>
//                   {" "}
//                   <h6>Good vs Scrap Product</h6>
//                   <GoodVsScrap />
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//       {/* <Container fluid>
//         <Row>
//           <Col className="graphs" xs={4}>
//             <h6>Finished vs Rework vs Scrap Products</h6> <PieChart />
//           </Col>

//           <Col className="graphs" xs={4}>
//             <h6>Number of Finished Products</h6>
//             <FinishedProduct />
//           </Col>
//           <Col className="graphs" xs={4}>
//             {" "}
//             <h6>Target vs Actual Products</h6>
//             <TargetAndActual />
//           </Col>
//         </Row>
//         <Row>
//           <Col className="graphs" xs={4}>
//             {" "}
//             <h6>Average Amount of Scrap by Cell</h6>
//             <AverageScrap />
//           </Col>
//           <Col className="graphs" xs={4}>
//             <h6>Average Amount of Downtime by Cell</h6>
//             <AverageDowntime />
//           </Col>
//           <Col className="graphs" xs={4}>
//             {" "}
//             <h6>Good vs Scrap Product</h6>
//             <GoodVsScrap />
//           </Col>
//         </Row>
//       </Container> */}
//     </div>
//   );
 };

export default Dashboard;
