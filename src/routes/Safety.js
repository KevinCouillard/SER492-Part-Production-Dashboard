import React from "react";
import { useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Safety = () => {
  const [value, setValue] = React.useState(dayjs());

  const handleChangeDate = (newValue) => {
    setIncident_date(newValue);
    setValue(newValue);
  };
  const handleEscDate = (newValue) => {
    setTargetDate(newValue);
    setValue(newValue);
  };
  const handleResDate = (newValue) => {
    setResolveDate(newValue);
    setValue(newValue);
  };
  const url = "http://localhost:4000";
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
  const [safetyList, setSafetyList] = useState([]);

  const addSafety = () => {
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
  };

  const getSafety = () => {
    Axios.get(url + "/safety")
      .then((response) => {
        setSafetyList(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className="safety" elevation={3}>
      <div>
      <label style={{margin : 15}}>Area: </label>
      
          <Select className="partNum" id="dropdown" value={area} error={!area} placeholder="Area 1" onChange={(event) => {
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
          </div>
          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Incident Date"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </div>
    <div>
      <div id="main">
        <TextField
          id="outlined-basic"
          label="Type"
          variant="outlined"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />

       {/*  <div className="area">
          <label>Area: </label>
          <input
            type="text"
            onChange={(event) => {
              setArea(event.target.value);
            }}
          />
        </div> */}
       {/*  <div className="incident_date">
          <label>incident_date: </label>
          <input
            type="text"
            onChange={(event) => {
              setIncident_date(event.target.value);
            }}
          />
        </div> */}
        <div className="process">
          <label>Process: </label>
          <input
            type="text"
            onChange={(event) => {
              setProcess(event.target.value);
            }}
          />
        </div>
        <div className="originName">
          <label>Originator Name: </label>
          <input
            type="text"
            onChange={(event) => {
              setOriginName(event.target.value);
            }}
          />
        </div>
        <div className="approveName">
          <label>Approved By: </label>
          <input
            type="text"
            onChange={(event) => {
              setApproveName(event.target.value);
            }}
          />
        </div>
        <div className="description">
          <label>Description of Incident: </label>
          <input
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="escalationName">
          <label>Escalation Name:: </label>
          <input
            type="text"
            onChange={(event) => {
              setEscalationName(event.target.value);
            }}
          />
        </div>
        <div className="targetDate">
        {/*   <label>targetDate: </label>
          <input
            type="text"
            onChange={(event) => {
              setTargetDate(event.target.value);
            }}
          /> */}
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Resolve By"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleEscDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="resolveDate">
         {/*  <label>resolveDate: </label>
          <input
            type="text"
            onChange={(event) => {
              setResolveDate(event.target.value);
            }}
          /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date Resolved"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleResDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <button onClick={getSafety}>Get Safety Report</button>
        <button onClick={addSafety}>Add Safety Report</button>
      </div>
      <div id="main">
        {safetyList.map((val, key) => {
          return (
            <div className="safety-display">
              <h3>type: {val.type}</h3>
              <h3>area: {val.area}</h3>
              <h3>incident_date: {val.incident_date}</h3>
              <h3>process: {val.process}</h3>
              <h3>originName: {val.originName}</h3>
              <h3>approveName: {val.approveName}</h3>
              <h3>description: {val.description}</h3>
              <h3>escalationName: {val.escalationName}</h3>
              <h3>targetDate: {val.targetDate}</h3>
              <h3>resolveDate: {val.resolveDate}</h3>
              <br />
            </div>
          );
        })}
      </div>
    </div>
    </Paper>
  );
};

export default Safety;
