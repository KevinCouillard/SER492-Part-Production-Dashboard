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

  const addTracking = () => {
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

  const getTracking = () => {
    Axios.get(url + "/tracking")
      .then((response) => {
        setTrackingList(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      component="form"
      sx={{
        // p: 2,
        // border: "1px solid black",
        "& .MuiTextField-root": { m: 3, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3}>
        <div>
          <TextField
            id="outlined-basic"
            label="Operator"
            variant="outlined"
            onChange={(event) => {
              setOperator(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Area"
            variant="outlined"
            onChange={(event) => {
              setArea(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Shift"
            variant="outlined"
            onChange={(event) => {
              setShift(event.target.value);
            }}
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
          </LocalizationProvider>
          <TextField
            id="outlined-basic"
            label="Target"
            variant="outlined"
            onChange={(event) => {
              setTarget(event.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="CTarget"
            variant="outlined"
            onChange={(event) => {
              setCTarget(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="CActual"
            variant="outlined"
            onChange={(event) => {
              setCActual(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Good"
            variant="outlined"
            onChange={(event) => {
              setGood(event.target.value);
            }}
          />
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
          <TextField
            id="outlined-basic"
            label="Down Time"
            variant="outlined"
            onChange={(event) => {
              setDownTime(event.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="DTimeCode"
            variant="outlined"
            onChange={(event) => {
              setDTimeCode(event.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </div>
        <Button onClick={getTracking} variant="contained">
          Get
        </Button>
        <Button
          onClick={addTracking}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Add
        </Button>
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

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
<Stack spacing={3}>
  <DesktopDatePicker
    label="Date desktop"
    inputFormat="MM/DD/YYYY"
    value={value}
    onChange={handleChange}
    renderInput={(params) => <TextField {...params} />}
  />
  <MobileDatePicker
    label="Date mobile"
    inputFormat="MM/DD/YYYY"
    value={value}
    onChange={handleChange}
    renderInput={(params) => <TextField {...params} />}
  />
  <TimePicker
    label="Time"
    value={value}
    onChange={handleChange}
    renderInput={(params) => <TextField {...params} />}
  />
  <DateTimePicker
    label="Date&Time picker"
    value={value}
    onChange={handleChange}
    renderInput={(params) => <TextField {...params} />}
  />
</Stack>
</LocalizationProvider> */
}
