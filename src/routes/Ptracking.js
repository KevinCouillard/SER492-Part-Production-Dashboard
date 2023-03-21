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

const Ptracking = () => {
  const { Box } = require("@mui/system");
  const [selectionMonth, setSelectionMonth] = useState("");
  const [selectionShift, setSelectionShift] = useState("");
  const [selectionOperator, setSelectionOperator] = useState("");
  const [date_tracked, setDate_tracked] = useState("");
  const [value, setValue] = React.useState(dayjs());
  const [trackingList, setTrackingList] = useState([]);

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

  const handleSelectMonth = (e) => {
    setSelectionMonth(e.target.value);
  };

  const handleSelectShift = (e) => {
    setSelectionShift(e.target.value);
  };

  const handleSelectOperator = (e) => {
    setSelectionOperator(e.target.value);
  };

  return (

    <Container className="filterBar" fluid>
      <Row className="m-2"></Row>
      <Row>
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
      <Row className="m-3"></Row>
      <Row>
        <Col>
          {trackingList.map((val, index) => (
            <Card key={index}>
              <Card.Header>
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
                <a href="/tracking" class="stretched-link"></a>
              </Card.Body>
            </Card>
          ))}
          ;
        </Col>
      </Row>
    </Container>
  );
};

export default Ptracking;
