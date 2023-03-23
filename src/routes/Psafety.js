import React, { useEffect } from "react";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "./Ptracking.css";
import Modal from 'react-bootstrap/Modal';


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
  const [originName, setOriginName] = useState("");
  const [approveName, setApproveName] = useState("");
  const [description, setDescription] = useState("");
  const [escalationName, setEscalationName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [resolveDate, setResolveDate] = useState("");

  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/safety");

      setSafetyList(result.data);
    };

    fetchData();
  }, []);


  const editSafety = (e) => {
    setSCardIndex(e.currentTarget.title);
    setSCardValue(e.currentTarget.value);
    console.log(safetyCardIndex);
    console.log(safetyCardValue);
    setModalShow(true);
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
              <Col id="modalCols" xl={3}>
                Type: {safetyList[safetyCardIndex].type}
              </Col>
              <Col id="modalCols" xl={3}>
                Area: {safetyList[safetyCardIndex].area}
              </Col>
              <Col id="modalCols" xl={3}>
                Process: {safetyList[safetyCardIndex].process}
              </Col>
              <Col id="modalCols" xl={3}>
                Origin Name: {safetyList[safetyCardIndex].originName}
              </Col>
              <Col id="modalCols" xl={3}>
                Approve Name: {safetyList[safetyCardIndex].approveName}
              </Col>
            </Row>
  
            <Row id="modalRows">
              <Col id="modalCols" xl={3}>
                Description: {safetyList[safetyCardIndex].description}
              </Col>
              <Col id="modalCols" xl={3}>
                Escalation Name: {safetyList[safetyCardIndex].escalationName}
              </Col>
              <Col id="modalCols" xl={3}>
                Target Date: {safetyList[safetyCardIndex].targetDate}
              </Col>
              <Col id="modalCols" xl={3}>
                Resolve Date: {safetyList[safetyCardIndex].resolveDate}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => {
            Axios.post(url + "/safety", {
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
                <MydModalWithGrid title={index} value={val} show={modalShow} onHide={() => setModalShow(false)} />
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Psafety;