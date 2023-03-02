import React from "react";
import { useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import "./Tracking.css";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";

const Tracking = () => {
  const [value, setValue] = React.useState(dayjs());

  const handleChangeDate = (newValue) => {
    setDate_tracked(newValue);
    setValue(newValue);
  };
  const handleChangeTime = (newValue) => {
    setTime_tracked(newValue);
    setValue(newValue);
  };
  const url = "http://localhost:4000";
  const [operator, setOperator] = useState("");
  const [area, setArea] = useState("");
  const [shift, setShift] = useState("");
  const [date_tracked, setDate_tracked] = useState("");
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
  const [trackingList, setTrackingList] = useState([]);
  const [workOrder, setWorkOrder] = useState("");

  // const [scrapList, setScrapList] = useState([
  //   { scrap: "" },
  //   { scrap: "" },
  //   { scrap: "" },
  // ]);

  const addTracking = () => {
    // setArea("");
    // setShift("");
    // setWorkOrder("");
    // setSelection("");
    // setTarget("");
    // setCTarget("");
    // setCActual("");
    // setGood("");
    // setBad("");
    // setBadCode("");
    // setDownTime("");
    // setDTimeCode("");
    // setComment("");
    Axios.post(url + "/tracking", {
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
  };

  const handleSelect = (e) => {
    setSelection(e.target.value);
  };

  // const newScrap = () => {
  //   setScrapList([...scrapList, { scrap: "" }]);
  // };

  return (
    <Box
      className="screen"
      component="form"
      sx={{
        // p: 2,
        // border: "1px solid black",
        "& .MuiTextField-root": { m: 3, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper className="trackingForm" elevation={3}>
        <div>
          <TextField
            id="outlined-basic"
            label="Area"
            variant="outlined"
            onChange={(event) => {
              setArea(event.target.value);
            }}
            value={area}
          />
          <TextField
            id="outlined-basic"
            label="Shift"
            variant="outlined"
            onChange={(event) => {
              setShift(event.target.value);
            }}
            value={shift}
          />
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date Tracked"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Time Tracked"
              value={value}
              onChange={handleChangeTime}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              id="outlined-basic"
              label="Work Order"
              variant="outlined"
              onChange={(event) => {
                setWorkOrder(event.target.value);
              }}
              value={workOrder}
            />
          </LocalizationProvider>
          <label>Part Number: </label>
          <Select
            className="partNum"
            id="dropdown"
            value={selection}
            placeholder="test"
            onChange={handleSelect}
          >
            <MenuItem value="Test 1">Test1</MenuItem>
            <MenuItem value="Test 2">Test2</MenuItem>
            <MenuItem value="Test 3">Test3</MenuItem>
          </Select>
          <TextField
            id="outlined-basic"
            label="Target"
            variant="outlined"
            onChange={(event) => {
              setTarget(event.target.value);
            }}
            value={target}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Cummulative Target"
            variant="outlined"
            onChange={(event) => {
              setCTarget(event.target.value);
            }}
            value={cTarget}
          />
          <TextField
            id="outlined-basic"
            label="Cummulative Actual"
            variant="outlined"
            onChange={(event) => {
              setCActual(event.target.value);
            }}
            value={cActual}
          />
          <TextField
            id="outlined-basic"
            label="Good"
            variant="outlined"
            onChange={(event) => {
              setGood(event.target.value);
            }}
            value={good}
          />
        </div>
        <div className="scrapForm">
          <TextField
            id="outlined-basic"
            label="Bad"
            variant="outlined"
            onChange={(event) => {
              setBad(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Bad Code"
            variant="outlined"
            onChange={(event) => {
              setBadCode(event.target.value);
            }}
          />

          <div className="plusBtn">
            <button className="btn btn-light">
              <FontAwesomeIcon icon={faPlus} className="plusIcon" />
              Add Reason Code
            </button>
          </div>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Down Time"
            variant="outlined"
            onChange={(event) => {
              setDownTime(event.target.value);
            }}
            value={downTime}
          />
          <TextField
            id="outlined-basic"
            label="DTimeCode"
            variant="outlined"
            onChange={(event) => {
              setDTimeCode(event.target.value);
            }}
            value={dTimeCode}
          />

          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            onChange={(event) => {
              setComment(event.target.value);
            }}
            value={comment}
          />
        </div>
        {/* <Button onClick={getTracking} variant="contained">
          Get
        </Button> */}
        <div className="addBtn">
          <Button
            onClick={addTracking}
            className="btn btn-outline-success"
            endIcon={<SendIcon />}
          >
            Add
          </Button>
        </div>
      </Paper>

      {trackingList.map((val, key) => {
        return (
          <div className="tracking-display">
            <br />
            <Paper elevation={4}>
              <h3>operator: {val.operator}</h3>
              <h3>area: {val.area}</h3>
              <h3>shift: {val.shift}</h3>
              <h3>process: {val.process}</h3>
              <h3>date_tracked: {val.date_tracked}</h3>
              <h3>time_tracked: {val.time_tracked}</h3>
              <h3>target: {val.target}</h3>
              <h3>cTarget: {val.cTarget}</h3>
              <h3>cActual: {val.cActual}</h3>
              <h3>good: {val.good}</h3>
              <h3>bad: {val.bad}</h3>
              <h3>badCode: {val.badCode}</h3>
              <h3>downTime: {val.downTime}</h3>
              <h3>dTimeCode: {val.dTimeCode}</h3>
              <h3>comment: {val.comment}</h3>
            </Paper>
          </div>
        );
      })}
    </Box>
  );
};

export default Tracking;
