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
import "./Ptracking.css";
import Modal from 'react-bootstrap/Modal';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


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
  const [operator, setOperator] = useState("");
  const [operatorText, onChangeOperatorText] = useState(operator);

  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");

      setTrackingList(result.data);
    };

    fetchData();
  }, []);

  // const fetchTracking = async (trackingId) => {
  //   const tracking = await Axios("http://localhost:4000/tracking/" + trackingId);
  //   setCurrentTracking(tracking);
  //   console.log(currentTracking.operator);
  // }

  const handleChangeTime = (newValue) => {
    setTime_tracked(newValue);
    setValue(newValue);
  };

  const handleChangeDate = (newValue) => {
    setDate_tracked(newValue);
    setValue(newValue);
  };

  const editTracking = (e) => {
    setCardIndex(e.currentTarget.title);
    setCardValue(e.currentTarget.value);
    setArea(trackingList[cardIndex].area);
    setShift(trackingList[cardIndex].shift);
    setDate_tracked(trackingList[cardIndex].date_tracked);
    setTime_tracked(trackingList[cardIndex].time_tracked);
    setGood(trackingList[cardIndex].good);
    setCActual(trackingList[cardIndex].cActual);
    setTarget(trackingList[cardIndex].target);
    setCTarget(trackingList[cardIndex].cTarget);
    setBad(trackingList[cardIndex].bad);
    setBadCode(trackingList[cardIndex].badCode);
    setDownTime(trackingList[cardIndex].downTime);
    setDTimeCode(trackingList[cardIndex].dTimeCode);
    setComment(trackingList[cardIndex].comment);
    setOperator(trackingList[cardIndex].operator);
    console.log(trackingList[cardIndex].date_tracked);
    console.log(shift);
    console.log(cardIndex);
    console.log(cardValue);
    //showModal();
    setModalShow(true);
  };

  // function showModal() {
  //   // setValue(trackingList[cardIndex].date_tracked);
  //   // setTarget(trackingList[cardIndex].target);
  //   // setCTarget(trackingList[cardIndex].cTarget);
  //   // console.log(trackingList[cardIndex].date_tracked);
  //   // setArea(trackingList[cardIndex].area);
  //   // setShift(trackingList[cardIndex].shift);
  //   // console.log(shift);
  //   setModalShow(true);
  // };

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
                value={date_tracked}
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
                {/* {setArea(trackingList[cardIndex].area)} */}
                <Select className="basic-single" id="adropdown" value={area} onChange={(event) => {
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
                {/* Area: {trackingList[cardIndex].area} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Shift: "} 
                <Select className="basic-single" id="sdropdown" value={shift} onChange={(event) => {
                    setShift(event.target.value);
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
                {/* {trackingList[cardIndex].shift} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Operator: "} 
                <MDBInput value={operator} id='typeText' type='text' onChange={(event) => {
                    setOperator(event.target.value);
                }}/>
                {/* Operator: {trackingList[cardIndex].operator} */}
              </Col>
            </Row>
                
            <Row>
              <Col id="timeCol" xl={2}>
                {"Time: "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time Tracked"
                    value={value}
                    onChange={handleChangeTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* Time: {trackingList[cardIndex].time_tracked} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Target: "}
                <MDBInput value={target} id='typeText' type='text' onChange={(event) => {
                    setTarget(event.target.value);
                }}/>
                {/* Target: {trackingList[cardIndex].target} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Cummulative Target: "}
                <MDBInput value={cTarget} id='typeText' type='text' onChange={(event) => {
                    setCTarget(event.target.value);
                }}/>
                {/* Cummulative Target: {trackingList[cardIndex].cTarget} */}
              </Col>
            </Row>

            <Row>
              <Col id="modalCols" xl={2}>
                {"Cummulative Actual: "}
                <MDBInput value={cActual} id='typeText' type='text' onChange={(event) => {
                    setCActual(event.target.value);
                }}/>
                {/* Cummulative Actual Pieces: {trackingList[cardIndex].cActual} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Good: "}
                <MDBInput value={good} id='typeText' type='text' onChange={(event) => {
                    setGood(event.target.value);
                }}/>
                {/* Good Parts: {trackingList[cardIndex].good} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Bad: "}
                <MDBInput value={bad} id='typeText' type='text' onChange={(event) => {
                    setBad(event.target.value);
                }}/>
                {/* Scrap: {trackingList[cardIndex].bad} */}
              </Col>
            </Row>
  
            <Row id="modalRows">
              <Col id="modalCols" xl={2}>
                {"Bad Code: "}
                <MDBInput value={badCode} id='typeText' type='text' onChange={(event) => {
                    setBadCode(event.target.value);
                }}/>
                {/* Scrap Reason Code: {trackingList[cardIndex].badCode} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Down Time: "}
                <MDBInput value={downTime} id='typeText' type='text' onChange={(event) => {
                    setDownTime(event.target.value);
                }}/>
                {/* Down Time: {trackingList[cardIndex].downTime} */}
              </Col>
              <Col id="modalCols" xl={2}>
                {"Down Time Code: "}
                <MDBInput value={dTimeCode} id='typeText' type='text' onChange={(event) => {
                    setDTimeCode(event.target.value);
                }}/>
                {/* Down Time Code: {trackingList[cardIndex].dTimeCode} */}
              </Col>
              <Col id="modalCols">
                {"Comment: "}
                <MDBInput value={comment} id='typeText' type='text' onChange={(event) => {
                    setComment(event.target.value);
                }}/>
                {/* Comment: {trackingList[cardIndex].comment} */}
              </Col>
            </Row>
            {/* <Row id="modalRows">
              
            </Row> */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ () => {
            console.log(trackingList[cardIndex].tracking_id);
            console.log(trackingList[cardIndex].area);
            console.log(area);
            Axios.put(url + "/tracking/" + trackingList[cardIndex].tracking_id, {
              operator: operator,
              area: area,
              shift: shift,
              date_tracked: date_tracked,
              time_tracked: time_tracked,
              target: target,
              cTarget: cTarget,
              cActual: cActual,
              good: good,
              bad: bad,
              badCode: badCode,
              downTime: downTime,
              dTimeCode: dTimeCode,
              comment: comment,
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
              {/* Try using val.tracking_id in title then getting that (should fix the delay) */}
              <Card.Header key={val.tracking_id} title={index} value={val} onClick={editTracking}>
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
              </Card.Body>
              <MydModalWithGrid style={{weight: '700px'}} title={index} value={val} show={modalShow} onHide={() => setModalShow(false)} />
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Ptracking;
