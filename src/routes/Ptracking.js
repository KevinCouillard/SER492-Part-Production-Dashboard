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


const Ptracking = () => {
  const { Box } = require("@mui/system");
  const [selectionMonth, setSelectionMonth] = useState("");
  const [selectionShift, setSelectionShift] = useState("");
  const [selectionOperator, setSelectionOperator] = useState("");
  const [date_tracked, setDate_tracked] = useState("");
  const [value, setValue] = React.useState(dayjs());
  const [trackingList, setTrackingList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardValue, setCardValue] = useState();
  const [area, setArea] = useState("");
  const [shift, setShift] = useState("");
  const [time_tracked, setTime_tracked] = useState("");
  const [selection, setSelection] = useState("");
  const [target, setTarget] = useState("");
  const [cTarget, setCTarget] = useState("");
  const [cActual, setCActual] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [badCode, setBadCode] = useState("");
  const [downTime, setDownTime] = useState("");
  const [dTimeCode, setDTimeCode] = useState("");
  const [comment, setComment] = useState("");

  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");

      setTrackingList(result.data);
    };

    fetchData();
  }, []);

  const handleChangeDate = (newValue) => {
    setDate_tracked(newValue);
    setValue(newValue);
  };

  const editTracking = (e) => {
    setCardIndex(e.currentTarget.title);
    setCardValue(e.currentTarget.value);
    setValue(trackingList[cardIndex].date_tracked);
    setTarget(trackingList[cardIndex].target);
    setCTarget(trackingList[cardIndex].cTarget);
    console.log(trackingList[cardIndex].area);
    setArea(trackingList[cardIndex].area);
    console.log(cardIndex);
    console.log(cardValue);
    setModalShow(true);
  };

  const handleSelectMonth = (e) => {
    setSelectionMonth(e.target.value);
  };

  const handleSelectShift = (e) => {
    setSelectionShift(e.target.value);
  };

  const handleSelectOperator = (e) => {
    console.log(e.target.value);
    setSelectionOperator(e.target.value);
  };

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} backdrop="static" centered aria-labelledby="contained-modal-title-vcenter" id="editModal">
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            {"Date: "} 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date Tracked"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/* {"Date: " + trackingList[cardIndex].date_tracked} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container id="modalContainer">
            <Row id="modalRows">
              <Col id="modalCols" xl={2}>
                {"Area: "}
                <Select className="partNum" id="dropdown" value={area} error={!area} onChange={(event) => {
                    setArea(event.target.value);
                }}>
                  <MenuItem value="Area 1">Area 1</MenuItem>
                  <MenuItem value="Area 2">Area 2</MenuItem>
                  <MenuItem value="Area 3">Area 3</MenuItem>
                  <MenuItem value="Area 4">Area 4</MenuItem>
                  <MenuItem value="Area 5">Area 5</MenuItem>
                  <MenuItem value="Area 6">Area 6</MenuItem>
                  <MenuItem value="Area 7">Area 7</MenuItem>
                  <MenuItem value="Area 8">Area 8</MenuItem>
                  <MenuItem value="Area 9">Area 9</MenuItem>
                  <MenuItem value="Area 10">Area 10</MenuItem>
                </Select>
                {/* Area: {trackingList[cardIndex].area} */}
              </Col>
              <Col id="modalCols" xl={2}>
                Shift: {trackingList[cardIndex].shift}
              </Col>
              <Col id="modalCols" xl={2}>
                Operator: {trackingList[cardIndex].operator}
              </Col>
              <Col id="modalCols" xl={2}>
                Time: {trackingList[cardIndex].time_tracked}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Target: "}
              <TextField
                id="outlined-basic"
                required
                label="Target"
                variant="outlined"
                onChange={(event) => {
                  setTarget(event.target.value);
                }}
                value={target}
                helperText={!target
                  ?"Target is required":""
                }
                error={!target}
              />
                {/* Target: {trackingList[cardIndex].target} */}
              </Col>
              <Col id="modalCols" xl={2}>
                  {"Cummulative Target: "}
                <TextField
                  id="outlined-basic"
                  required
                  label="Cummulative Target"
                  variant="outlined"
                  onChange={(event) => {
                    setCTarget(event.target.value);
                  }}
                  value={cTarget}
                  helperText={!cTarget
                    ?"Cummalative Target is required":""
                  }
                  error={!cTarget}
                />
                {/* Cummulative Target: {trackingList[cardIndex].cTarget} */}
              </Col>
            </Row>
  
            <Row id="modalRows">
              <Col id="modalCols" xl={2}>
                Cummulative Actual Pieces: {trackingList[cardIndex].cActual}
              </Col>
              <Col id="modalCols" xl={2}>
                Good Parts: {trackingList[cardIndex].good}
              </Col>
              <Col id="modalCols" xl={2}>
                Scrap: {trackingList[cardIndex].bad}
              </Col>
              <Col id="modalCols" xl={2}>
                Scrap Reason Code: {trackingList[cardIndex].badCode}
              </Col>
              <Col id="modalCols" xl={2}>
                Down Time: {trackingList[cardIndex].downTime}
              </Col>
              <Col id="modalCols" xl={2}>
                Down Time Code: {trackingList[cardIndex].dTimeCode}
              </Col>
            </Row>
            <Row id="modalRows">
              <Col id="modalCols">
                Comment: {trackingList[cardIndex].comment}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => {
            Axios.put(url + "/tracking", {
              operator: trackingList[cardIndex].operator,
              area: trackingList[cardIndex].area,
              shift: trackingList[cardIndex].shift,
              date_tracked: trackingList[cardIndex].date_tracked,
              time_tracked: trackingList[cardIndex].time_tracked,
              target: trackingList[cardIndex].target,
              cTarget: trackingList[cardIndex].cTarget,
              cActual: trackingList[cardIndex].cActual,
              good: trackingList[cardIndex].good,
              bad: trackingList[cardIndex].bad,
              badCode: trackingList[cardIndex].badCode,
              downTime: trackingList[cardIndex].downTime,
              dTimeCode: trackingList[cardIndex].dTimeCode,
              comment: trackingList[cardIndex].comment,
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              className="dayInput"
              value={value}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Col>
        <Col>
          <label>Month: </label>
          <Select value={selectionMonth} onChange={handleSelectMonth}>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="Febuary">Febuary</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </Col>
        <Col>
          <label>Shift: </label>
          <Select value={selectionShift} onChange={handleSelectShift}>
            <MenuItem value="8:00-9:00">8:00-9:00</MenuItem>
            <MenuItem value="9:00-10:00">9:00-10:00</MenuItem>
            <MenuItem value="10:00-11:00">10:00-11:00</MenuItem>
            <MenuItem value="11:00-12:00">11:00-12:00</MenuItem>
            <MenuItem value="12:00-1:00">12:00-1:00</MenuItem>
            <MenuItem value="1:00-2:00">1:00-2:00</MenuItem>
            <MenuItem value="2:00-3:00">2:00-3:00</MenuItem>
            <MenuItem value="3:00-4:00">3:00-4:00</MenuItem>
          </Select>
        </Col>
        <Col>
          <label>Operator: </label>
          <Select value={selectionOperator} onChange={handleSelectOperator}>
            <MenuItem value="Matt">Matt</MenuItem>
            <MenuItem value="Jeff">Jeff</MenuItem>
            <MenuItem value="James">James</MenuItem>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col id="cardsCol">
          {trackingList.map((val, index) => (      
            <Card id="trackingCard" key={index}>
              <Card.Header key={index} title={index} value={val} onClick={editTracking}>
                Date: {val.date_tracked} &nbsp; &nbsp; &nbsp; &nbsp; Area:{" "}
                {val.area} &nbsp; &nbsp; &nbsp; &nbsp; Shift: {val.shift} &nbsp;
                &nbsp; &nbsp; &nbsp; Operator: {val.operator} &nbsp; &nbsp;
                &nbsp; &nbsp; Time: {val.time_tracked}
              </Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  Target: {val.target} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Good Parts:{" "}
                  {val.good} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; Comment: {val.comment}
                </Card.Text>
                <br></br>
                <Card.Text>
                  Cummulative Target: {val.cTarget} &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Scrap: {val.bad}{" "}
                  &nbsp; &nbsp; Reason Code: {val.badCode}
                </Card.Text>
                <br></br>
                <Card.Text>
                  Cummulative Actual Pieces: {val.cActual} &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; Down Time: {val.downTime} &nbsp; &nbsp;
                  Down Time Code: {val.dTimeCode}
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

export default Ptracking;
