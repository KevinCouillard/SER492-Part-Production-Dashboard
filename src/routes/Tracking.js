import React, { useEffect } from "react";
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
import { FormControl, Input, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import swal from 'sweetalert';
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from 'react-toastify';
const Joi =require('joi');

function TrackingForm(props) {
const [customer, setCustomer] = useState({
  target: "",
  date_tracked: "",
  //time_tracked:"",
  cTarget:"",
  cActual:"",
  good:"",
  partNum:"",
  workOrder:"",
/*   bad:"",
  badCode:"",
  downTime:"",
  dTimeCode:"", */
  //comment:"", 
});
const [value, setValue] = React.useState(dayjs());
const handleChangeTime = (newValue) => {
  setTime_tracked(newValue);
  setValue(newValue);
};

const [errors, setErrors] = useState({});
const schema = {
  date_tracked: Joi.date().min("2001-01-01").required(),
  target: Joi.number().min(1).max(10000).required(),
  //time_tracked: Joi.date().timestamp().required(),
  cTarget:Joi.number().min(1).max(10000).required(),
  cActual:Joi.number().min(1).max(10000).required(),
  good:Joi.number().min(1).max(10000).required(),
  partNum:Joi.number().min(1).max(1000000).required(),
  workOrder:Joi.number().min(1).max(1000000).required(),

/*   bad:Joi.number().min(0).max(10000),
  badCode:Joi.string().min(1).max(2),
  downTime:Joi.number().min(0).max(60),
  dTimeCode:Joi.string().min(1).max(2), */
  //comment:Joi.string(), 
};

const validateForm = (event) => {
  event.preventDefault();
  const result = Joi.validate(customer,
    schema, { abortEarly: false });
  console.log(result);
  const { error } = result;
  if (!error) {
  return null;
  } else {
  const errorData = {};
  for (let item of error.details) {
    const name = item.path[0];
    const message = item.message;
    errorData[name] = message;
  }
  console.log(errors);
  setErrors(errorData);
  return errorData;
  }
};

const handleSave = (event) => {
  const { name, value } = event.target;
  let errorData = { ...errors };
  const errorMessage = validateProperty(event);
  if (errorMessage) {
  errorData[name] = errorMessage;
  } else {
  delete errorData[name];
  }
  let customerData = { ...customer };
  customerData[name] = value;
  setCustomer(customerData);
  setErrors(errorData);
};

const validateProperty = (event) => {
  const { name, value } = event.target;
  const obj = { [name]: value };
  const subSchema = { [name]: schema[name] };
  const result = Joi.validate(obj, subSchema);
  const { error } = result;
  return error ? error.details[0].message : null;
};
const clearState = () => {
  setCustomer({
  target: "",
  date_tracked: "",
  time_tracked:"",
  cTarget:"",
  cActual:"",
  good:"",
/*   bad:"",
  badCode:"",
  downTime:"",
  dTimeCode:"",
  comment:"",  */

  });
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
const [workOrder, setWorkOrder] = useState("");



const [sidebarOpen, setSidebarOpen] = useState(false);
const [sideWidth, setSideWidth] = useState();

const openSidebar = () => {
  setSidebarOpen(true);
};
const closeSidebar = () => {
  setSidebarOpen(false);
};

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

const [scrapList, setScrapList] = useState([
  {},
]);

const [scrapListHtml, setscrapListHtml] = useState(<div></div>);

useEffect(() => {
  loadScrapList(scrapList)
}, [scrapList]);

const loadScrapList = (scrapList) => {
  
  setscrapListHtml(
    
    scrapList.map((index) => (
      <div key={index}>
      <TextField
        id="outlined-basic"
        label="Scrap"
        variant="outlined"
        onChange={(event) => {
          setBad(event.target.value);
        }}
        value={bad}
      />
      <TextField
        id="outlined-basic"
        label="Reason Code"
        variant="outlined"
        onChange={(event) => {
          setBadCode(event.target.value);
        }}
        value={badCode}
      />
      </div>
    ))
  );
}
const newScrap = () => { 
  console.log(scrapList)
  setScrapList([...scrapList, { scrap: "" }]);
};

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
       
          {/*   <Box
              className="screen"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 3, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box> */}
  
  <div className="tracking">
  <h3>Day By Hour Tracking </h3>
  <form className="ui form">

  <Row>
    
  <div className="form-group">
    <label>Date Tracked</label>
    <input
      type="date"
      name="date_tracked"
      className="form-control"
      value={customer.date_tracked}
      onChange={handleSave}
    />
    </div>
    {errors.date_tracked && (
    <div className="alert alert-danger">
      {errors.date_tracked}
    </div>
    )}
    
    
    <div className="form-group">
    <label>Part Number</label>
    <input
      type="number"
      name="partNum"
      className="form-control"
      value={customer.partNum}
      onChange={handleSave}
    />
    </div>
    {errors.partNum && (
    <div className="alert alert-danger">
      {errors.partNum}
    </div>
    )}
    <div className="form-group">
    <label>Work Order</label>
    <input
      type="number"
      name="workOrder"
      className="form-control"
      value={customer.workOrder}
      onChange={handleSave}
    />
    </div>
    {errors.workOrder && (
    <div className="alert alert-danger">
      {errors.workOrder}
    </div>
    )}
    </Row>
    <div className="sectionone">
  <label style={{margin : 10}}>Area: </label>
    <Select className="partNum" id="dropdown" value={area}  placeholder="Area 1" onChange={(event) => {
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
    <label style={{margin : 10}}>Shift: </label>
    <Select className="partNum" id="dropdown" value={shift}  placeholder="8:00-9:00" onChange={(event) => {
        setShift(event.target.value);
      }}>
      <MenuItem value="7:00-8:00 A.M.">7:00-8:00 A.M.</MenuItem>
      <MenuItem value="8:00-9:00 A.M.">8:00-9:00 A.M.</MenuItem>
      <MenuItem value="9:00-10:00 A.M.">9:00-10:00 A.M.</MenuItem>
      <MenuItem value="10:00-11:00 A.M.">10:00-11:00 A.M.</MenuItem>
      <MenuItem value="11:00-12:00 A.M.">11:00-12:00 A.M.</MenuItem>
      <MenuItem value="12:00-1:00 P.M.">12:00-1:00 P.M.</MenuItem>
      <MenuItem value="1:00-2:00 P.M.">1:00-2:00 P.M.</MenuItem>
      <MenuItem value="12:00-1:00 P.M.">2:00-3:00 P.M.</MenuItem>
      <MenuItem value="1:00-2:00 P.M.">3:00-4:00 P.M.</MenuItem>
      <MenuItem value="12:00-1:00 P.M.">4:00-5:00 P.M.</MenuItem>
    </Select>
    </div>
    
    

{/*     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Time Tracked"
        value={value}
        onChange={handleChangeTime}
        renderInput={(params) => <Input {...params} />}
      />
      </LocalizationProvider> */}
      
   
{/*   <div className="form-group">
    <label>Time Tracked</label>
    <input
      type="timestamp"
      name="time_tracked"
      className="form-control"
      value={customer.time_tracked}
      onChange={handleSave}
    />
    </div>
    {errors.time_tracked && (
    <div className="alert alert-danger">
      {errors.time_tracked}
    </div>
    )} */}
    <Row className="rowone">
    <div className="form-group">
    <label>Target</label>
    <input
      type="number"
      name="target"
      className="form-control"
      value={customer.target}
      onChange={handleSave}
    />
    </div>
    {errors.target && (
    <div className="alert alert-danger">
      {errors.target}
    </div>
    )}
    <div className="form-group">
    <label>Cummulative Target</label>
    <input
      type="number"
      name="cTarget"
      className="form-control"
      value={customer.cTarget}
      onChange={handleSave}
    />
    </div>
    {errors.cTarget && (
    <div className="alert alert-danger">
      {errors.cTarget}
    </div>
    )}
    </Row>
    <Row className="rowtwo">
    <div className="form-group">
    <label>Cummulative Actual</label>
    <input
      type="number"
      name="cActual"
      className="form-control"
      value={customer.cActual}
      onChange={handleSave}
    />
    </div>
    {errors.cActual && (
    <div className="alert alert-danger">
      {errors.cActual}
    </div>
    )}
    <div className="form-group">
    <label>Good</label>
    <input
      type="number"
      name=  "good"
      className="form-control"
      value={customer.good}
      onChange={handleSave}
    />
    </div>
    {errors.good && (
    <div className="alert alert-danger">
      {errors.good}
    </div>
    )}
    </Row>
    
    <div className="scrapForm">
  {scrapListHtml}
    <div className="plusBtn">
        <button class="btn btn-light" onClick={newScrap}><FontAwesomeIcon icon={faPlus} className="plusIcon" />Add Reason Code</button>
      </div>
      </div>
    
    <Row>
<div className="form-group">
    <label>Downtime</label>
    <input
      type="number"
      name=  "downTime"
      className="form-control"
      value={customer.downTime}
      onChange={handleSave}
    />
    </div>
   
      <div className="form-group">
    <label>Downtime Reason Code</label>
    <input
      type="string"
      name=  "dTimeCode"
      className="form-control"
      value={customer.dTimeCode}
      onChange={handleSave}
    />
    </div>
    </Row>
  
      <div className="comment-section">
    <label>Comments</label>
    <input
      type="string"
      name=  "comment"
      className="form-control"
      value={customer.comment}
      onChange={handleSave}
    />
    </div>
  {/*   {errors.comment && (
    <div className="alert alert-danger">
      {errors.comment}
    </div>
    )} */}
   
    <div className="btn">
    <button
      type="submit"
      onClick={validateForm}
      
      className="btn btn-success"
    >
      Submit
    </button>
    </div>
   
  </form>
  
  </div>
      </Col>
    </Row>
  </Container>
);
}
export default TrackingForm;
