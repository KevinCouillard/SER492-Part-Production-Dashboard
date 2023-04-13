import React, { useEffect } from "react";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBInput } from 'mdb-react-ui-kit';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "./pSafety.css";
import Modal from 'react-bootstrap/Modal';
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar.js";


const Psafety = () => {
  const { Box } = require("@mui/system");
  const [selectionType, setSelectionType] = useState("");
  const [selectionArea, setSelectionArea] = useState("");
  const [selectionDate, setSelectionDate] = useState("");
  const [value, setValue] = React.useState(dayjs());
  const [safetyList, setSafetyList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [safetyCardIndex, setSCardIndex] = useState(0);
  const [safetyCardValue, setSCardValue] = useState();
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [incident_date, setIncident_date] = useState("");
  const [process, setProcess] = useState("");

  const [newProcess, setNewProcess] = useState("");

  const [originName, setOriginName] = useState("");
  const [approveName, setApproveName] = useState("");
  const [description, setDescription] = useState("");
  const [escalationName, setEscalationName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [resolveDate, setResolveDate] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState();

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const url = "http://localhost:4000";

  useEffect(() => {
    console.log('page loaded');
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/safety");

      setSafetyList(result.data);
    };

    fetchData();
  }, []);


  const editSafety = (e) => {
    setSCardIndex(e.currentTarget.title);
    setSCardValue(e.currentTarget.value);
    setType(safetyList[safetyCardIndex].type);
    setArea(safetyList[safetyCardIndex].area);
    setIncident_date(safetyList[safetyCardIndex].incident_date);
    setProcess(safetyList[safetyCardIndex].process);
    setOriginName(safetyList[safetyCardIndex].originName);
    setApproveName(safetyList[safetyCardIndex].approveName);
    setDescription(safetyList[safetyCardIndex].description);
    setEscalationName(safetyList[safetyCardIndex].escalationName);
    setTargetDate(safetyList[safetyCardIndex].targetDate);
    setResolveDate(safetyList[safetyCardIndex].resolveDate);
    setModalShow(true);
  };

  const handleChangeTDate = (newValue) => {
    setTargetDate(newValue);
  };

  const handleChangeRDate = (newValue) => {
    setResolveDate(newValue);
  };

  const handleSelectType = (e) => {
    setSelectionType(e.target.value);
  };

  const handleSelectArea = (e) => {
    setSelectionArea(e.target.value);
  };

  const handleSelectDate = (e) => {
    console.log(e.target.value);
    setSelectionDate(e.target.value);
  };

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} backdrop="static" centered aria-labelledby="contained-modal-title-vcenter" id="editModal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {"Incident Date: " + safetyList[safetyCardIndex].incident_date}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container id="modalContainer">
            <Row id="modalRows">
              <Col id="modalCols" xl={2}>
                {/* {"Type: "} */}
                {/* <MDBInput value={type} id='typeText' type='text' onChange={(event) => {
                    setType(event.target.value);
                }}/> */}
                Type: {safetyList[safetyCardIndex].type}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Area: "}
                <Select className="basic-single" id="dropdown" value={area} onChange={(event) => {
                    setArea(event.target.value);
                }}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </Col>
              <Col id="modalCols" xl={2}>
                {"Process: "}
                <MDBInput value={process} id='typeText' type='text' onChange={(event) => {
                  setNewProcess(event.target.value)
                  // setProcess(event.target.value);
                }}/>
                {/* Process: {safetyList[safetyCardIndex].process} */}
              </Col>
            </Row>

            <Row>
              <Col id="modalCols" xl={2}>
                {"Origin Name: "}
                <MDBInput value={originName} id='typeText' type='text' onChange={(event) => {
                  setOriginName(event.target.value);
                }}/>
                {/* Origin Name: {safetyList[safetyCardIndex].originName} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Approve Name: "}
                <MDBInput value={approveName} id='typeText' type='text' onChange={(event) => {
                  setApproveName(event.target.value);
                }}/>
                {/* Approve Name: {safetyList[safetyCardIndex].approveName} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Description: "}
                <MDBInput value={description} id='typeText' type='text' onChange={(event) => {
                  setDescription(event.target.value);
                }}/>
                {/* Description: {safetyList[safetyCardIndex].description} */}
              </Col>
            </Row>
  
            <Row id="modalRows">
              <Col id="modalCols" xl={2}>
                {"Escalation Name: "}
                <MDBInput value={escalationName} id='typeText' type='text' onChange={(event) => {
                  setEscalationName(event.target.value);
                }}/>
                {/* Escalation Name: {safetyList[safetyCardIndex].escalationName} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Target Date: "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date Tracked"
                    inputFormat="MM/DD/YYYY"
                    value={targetDate}
                    onChange={handleChangeTDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* Target Date: {safetyList[safetyCardIndex].targetDate} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Resolve Date: "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date Tracked"
                    inputFormat="MM/DD/YYYY"
                    value={resolveDate}
                    onChange={handleChangeRDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* Resolve Date: {safetyList[safetyCardIndex].resolveDate} */}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => {
            Axios.put(url + "/safety/" + safetyList[safetyCardIndex].case_id, {
                type: type,
                area: area,
                incident_date: incident_date,
                process: process,
                originName: originName,
                approveName: approveName,
                description: description,
                escalationName: escalationName,
                targetDate: targetDate,
                resolveDate: resolveDate,
                headers: {
                  "content-type": "application/json",
                },
              })
                .then(function (response) {
                  console.log(response);
                })
                .catch((err) => console.log(err));
          }}>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (

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
          <Container className="filterBar" fluid>
            <Row id="filter">
              <Col>
                <label>Type: </label>
                <Select value={selectionType} onChange={handleSelectType}>
                  <MenuItem value="Type 1">Type 1</MenuItem>
                  <MenuItem value="Type 2">Type 2</MenuItem>
                  <MenuItem value="Type 3">Type 3</MenuItem>
                  <MenuItem value="Type 4">Type 4</MenuItem>
                </Select>
              </Col>
              <Col>
                <label>Area: </label>
                <Select value={selectionArea} onChange={handleSelectArea}>
                  <MenuItem value="Area 1">Area 1</MenuItem>
                  <MenuItem value="Area 2">Area 2</MenuItem>
                  <MenuItem value="Area 3">Area 3</MenuItem>
                  <MenuItem value="Area 4">Area 4</MenuItem>
                  <MenuItem value="Area 5">Area 5</MenuItem>
                  <MenuItem value="Area 6">Area 6</MenuItem>
                  <MenuItem value="Area 7">Area 7</MenuItem>
                  <MenuItem value="Area 8">Area 8</MenuItem>
                </Select>
              </Col>
              <Col>
                <label>Date: </label>
                <Select value={selectionDate} onChange={handleSelectDate}>
                  <MenuItem value="11/5/2022">11/5/2022</MenuItem>
                  <MenuItem value="2/3/2023">2/3/2023</MenuItem>
                  <MenuItem value="3/13/2023">3/13/2023</MenuItem>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col id="cardsCol">
                {safetyList.map((val, index) => (      
                  <Card id="trackingCard" key={index}>
                    <Card.Header key={index} title={index} value={val} onClick={editSafety}>
                      Type: {val.type} &nbsp; &nbsp; &nbsp; &nbsp; Area:{" "}
                      {val.area} &nbsp; &nbsp; &nbsp; &nbsp; Incident Date: {val.incident_date}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>
                        Process: {val.process} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Origin Name:{" "}
                        {val.originName} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; Approve Name: {val.approveName}
                      </Card.Text>
                      <br></br>
                      <Card.Text>
                        Description: {val.description} &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Escalation Name: {val.escalationName}{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Target Date: {val.targetDate}
                      </Card.Text>
                      <br></br>
                      <Card.Text>
                        Resolve Date: {val.resolveDate}
                      </Card.Text>
                      <MydModalWithGrid id="editModal" title={index} value={val} show={modalShow} onHide={() => setModalShow(false)} />
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
          </Col>
        </Row>
      </Container>
  );
};

export default Psafety;