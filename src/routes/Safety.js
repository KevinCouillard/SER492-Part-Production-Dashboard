import React from "react";
import { useState } from "react";
import "./safety.css";
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { spacing } from "@mui/system";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar.js";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState();

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

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
            <Paper className="safety" elevation={3}>
              <h2>Safety Report</h2>
              <div>
              <label style={{margin : 15}}>Area: </label>
              
                  <Select className="areaNum" id="dropdown" value={area} error={!area} placeholder="Area 1" onChange={(event) => {
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
                <Form>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3" onChange={(event) => {
                  setArea(event.target.value);
                }}>
                  <Form.Check
                    inline
                    label="NR1: First Aid"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="NR2: Near Miss Accident"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="NR3: Unsafe Situation"
                    name="group1"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                
                </div>
              ))}
            </Form>
            <Row xs={2} md={4} lg={6}>
              <Col>
                <TextField style={{ minHeight: '75px'}}
                    id="outlined-basic"
                    label="Process"
                    variant="outlined"
                    onChange={(event) => {
                      setProcess(event.target.value);
                    }}
                    margin="dense"
                  />
                  </Col>
                  <Col>
                  <div>
                <TextField
                  id="outlined-basic"
                  label="Originator Name"
                  variant="outlined"
                  onChange={(event) => {
                    setOriginName(event.target.value);
                  }}
                  margin="dense"
                />
                </div>
                </Col>
                
                </Row>
                
                
                <div>
                <TextField style={{ minWidth: '600px', minHeight:'75px'}}
                  id="outlined-basic"
                  label="Description of Incident"
                  variant="outlined"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  margin="dense"
                  
                />
                </div>
                <Row xs={2} md={4} lg={6}>
                  <Col>
                <div >
                <TextField style={{ minHeight: '75px'}}
                  id="outlined-basic"
                  label="Escalation Name"
                  variant="outlined"
                  onChange={(event) => {
                    setEscalationName(event.target.value);
                  }}
                  
                />
                </div>
                </Col>
                <Col>
                <div className="targetDate" style={{ minHeight: '50px'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Resolve By"
                      inputFormat="MM/DD/YYYY"
                      margin="dense"
                      value={value}
                      onChange={handleEscDate}
                      renderInput={(params) => <TextField {...params} />}
                      
                    />
                  </LocalizationProvider>
                </div>
                </Col>
                </Row>
              {/*  <div className="resolveDate">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date Resolved"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleResDate}
                      renderInput={(params) => <TextField {...params} />}
                      margin="dense"
                    />
                  </LocalizationProvider>
                </div> */}
              
              <Row xs={2} md={4} lg={6}>
              <Col><div className="saveBtn">
                  <Button
                    onClick={addSafety}
                    class="btn btn-outline-primary"
                    endIcon={<SaveAsIcon />}
                  >
                    Save
                  </Button>
                </div>
                </Col>
                <Col><div className="submitBtn">
                  <Button
                    onClick={addSafety}
                    class="btn btn-outline-success"
                    endIcon={<SendIcon />}
                  >
                    Submit
                  </Button>
                </div>
                </Col>
                </Row>
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
          </Col>
        </Row>
      </Container>
    
    // <Paper className="safety" elevation={3}>
    //   <h2>Safety Report</h2>
    //   <div>
    //   <label style={{margin : 15}}>Area: </label>
      
    //       <Select className="areaNum" id="dropdown" value={area} error={!area} placeholder="Area 1" onChange={(event) => {
    //           setArea(event.target.value);
    //         }}>
    //         <MenuItem value="Area 1">Area 1</MenuItem>
    //         <MenuItem value="Area 2">Area 2</MenuItem>
    //         <MenuItem value="Area 3">Area 3</MenuItem>
    //         <MenuItem value="Area 4">Area 4</MenuItem>
    //         <MenuItem value="Area 5">Area 5</MenuItem>
    //         <MenuItem value="Area 6">Area 6</MenuItem>
    //         <MenuItem value="Area 7">Area 7</MenuItem>
    //         <MenuItem value="Area 8">Area 8</MenuItem>
    //         <MenuItem value="Area 9">Area 9</MenuItem>
    //         <MenuItem value="Area 10">Area 10</MenuItem>
    //       </Select>
          
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DesktopDatePicker
    //           label="Incident Date"
    //           inputFormat="MM/DD/YYYY"
    //           value={value}
    //           onChange={handleChangeDate}
    //           renderInput={(params) => <TextField {...params} />}
    //         />
    //       </LocalizationProvider>
    //       </div>
    // <div>
    //   <div id="main">
    //      <Form>
    //   {['radio'].map((type) => (
    //     <div key={`inline-${type}`} className="mb-3" onChange={(event) => {
    //       setArea(event.target.value);
    //     }}>
    //       <Form.Check
    //         inline
    //         label="NR1: First Aid"
    //         name="group1"
    //         type={type}
    //         id={`inline-${type}-1`}
    //       />
    //       <Form.Check
    //         inline
    //         label="NR2: Near Miss Accident"
    //         name="group1"
    //         type={type}
    //         id={`inline-${type}-2`}
    //       />
    //       <Form.Check
    //         inline
    //         label="NR3: Unsafe Situation"
    //         name="group1"
    //         type={type}
    //         id={`inline-${type}-3`}
    //       />
        
    //     </div>
    //   ))}
    // </Form>
    // <Row xs={2} md={4} lg={6}>
    //   <Col>
    //      <TextField style={{ minHeight: '75px'}}
    //          id="outlined-basic"
    //          label="Process"
    //          variant="outlined"
    //          onChange={(event) => {
    //            setProcess(event.target.value);
    //          }}
    //          margin="dense"
    //        />
    //       </Col>
    //       <Col>
    //       <div>
    //     <TextField
    //       id="outlined-basic"
    //       label="Originator Name"
    //       variant="outlined"
    //       onChange={(event) => {
    //         setOriginName(event.target.value);
    //       }}
    //       margin="dense"
    //     />
    //     </div>
    //     </Col>
         
    //     </Row>
         
        
    //      <div>
    //     <TextField style={{ minWidth: '600px', minHeight:'75px'}}
    //       id="outlined-basic"
    //       label="Description of Incident"
    //       variant="outlined"
    //       onChange={(event) => {
    //         setDescription(event.target.value);
    //       }}
    //       margin="dense"
          
    //     />
    //      </div>
    //      <Row xs={2} md={4} lg={6}>
    //       <Col>
    //      <div >
    //     <TextField style={{ minHeight: '75px'}}
    //       id="outlined-basic"
    //       label="Escalation Name"
    //       variant="outlined"
    //       onChange={(event) => {
    //         setEscalationName(event.target.value);
    //       }}
          
    //     />
    //      </div>
    //      </Col>
    //     <Col>
    //     <div className="targetDate" style={{ minHeight: '50px'}}>
    //        <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DesktopDatePicker
    //           label="Resolve By"
    //           inputFormat="MM/DD/YYYY"
    //           margin="dense"
    //           value={value}
    //           onChange={handleEscDate}
    //           renderInput={(params) => <TextField {...params} />}
              
    //         />
    //       </LocalizationProvider>
    //     </div>
    //     </Col>
    //     </Row>
    //    {/*  <div className="resolveDate">
    //         <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DesktopDatePicker
    //           label="Date Resolved"
    //           inputFormat="MM/DD/YYYY"
    //           value={value}
    //           onChange={handleResDate}
    //           renderInput={(params) => <TextField {...params} />}
    //           margin="dense"
    //         />
    //       </LocalizationProvider>
    //     </div> */}
       
    //    <Row xs={2} md={4} lg={6}>
    //    <Col><div className="saveBtn">
    //       <Button
    //         onClick={addSafety}
    //         class="btn btn-outline-primary"
    //         endIcon={<SaveAsIcon />}
    //       >
    //         Save
    //       </Button>
    //     </div>
    //     </Col>
    //     <Col><div className="submitBtn">
    //       <Button
    //         onClick={addSafety}
    //         class="btn btn-outline-success"
    //         endIcon={<SendIcon />}
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //     </Col>
    //     </Row>
    //   </div>
    //   <div id="main">
    //     {safetyList.map((val, key) => {
    //       return (
    //         <div className="safety-display">
    //           <h3>type: {val.type}</h3>
    //           <h3>area: {val.area}</h3>
    //           <h3>incident_date: {val.incident_date}</h3>
    //           <h3>process: {val.process}</h3>
    //           <h3>originName: {val.originName}</h3>
    //           <h3>approveName: {val.approveName}</h3>
    //           <h3>description: {val.description}</h3>
    //           <h3>escalationName: {val.escalationName}</h3>
    //           <h3>targetDate: {val.targetDate}</h3>
    //           <h3>resolveDate: {val.resolveDate}</h3>
    //           <br />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    // </Paper>
   
  );
};

export default Safety;
