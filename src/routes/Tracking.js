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
import swal from "sweetalert";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState();
  const [products, setProductsList] = useState([]);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const product = await Axios("http://localhost:4000/product");
      setProductsList(product.data);
      console.log(product.data);
    };

    fetchData();
  }, []);
  const [scrapList, setScrapList] = useState([{}]);

  const [scrapListHtml, setscrapListHtml] = useState(<div></div>);

  useEffect(() => {
    loadScrapList(scrapList);
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
  };

  const addTracking = () => {
    if (
      area == "0" ||
      shift == "0" ||
      selection == "0" ||
      target == "0" ||
      cTarget == "0" ||
      cActual == "0" ||
      good == "0" ||
      bad == "0" ||
      badCode == "" ||
      downTime == "0" ||
      dTimeCode == ""
    ) {
      swal({
        title: "Error!",
        text: "Fill out all required inputs!",
        icon: "error",
      });
    } else {
      swal({
        text: "Tracking form was submitted!",
        icon: "success",
      });
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
    }
  };

  const handleSelect = (e) => {
    setSelection(e.target.value);
  };

  const newScrap = () => {
    console.log(scrapList);
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
        <Col md={2} id="sidebar" className="sideBar" style={{ width: "174px" }}>
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </Col>
        <Col md={8} className="screen">
          <Box
            className="screen"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Paper className="trackingForm" elevation={3}>
              <div>
                <label style={{ margin: 15 }}>Area: </label>
                <Select
                  className="partNum"
                  id="dropdown"
                  value={area}
                  error={!area}
                  placeholder="Area 1"
                  onChange={(event) => {
                    setArea(event.target.value);
                  }}
                >
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
                <label style={{ margin: 15 }}>Shift: </label>
                <Select
                  className="partNum"
                  id="dropdown"
                  value={shift}
                  error={!shift}
                  placeholder="8:00-9:00"
                  onChange={(event) => {
                    setShift(event.target.value);
                  }}
                >
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
                    required
                    label="Work Order"
                    variant="outlined"
                    onChange={(event) => {
                      setWorkOrder(event.target.value);
                    }}
                    value={workOrder}
                    helperText={!workOrder ? "Work Order is required" : ""}
                    error={!workOrder}
                  />
                </LocalizationProvider>
                <label>Part Number: </label>
                <Select
                  className="partNum"
                  id="dropdown"
                  required
                  value={selection}
                  placeholder="test"
                  onChange={handleSelect}
                  error={!selection}
                >
                  {products.map((product) => (
                    <MenuItem value={product.code}>{product.code}</MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  required
                  label="Target"
                  variant="outlined"
                  onChange={(event) => {
                    setTarget(event.target.value);
                  }}
                  value={target}
                  helperText={!target ? "Target is required" : ""}
                  error={!target}
                />
                <TextField
                  type="number"
                  id="outlined-basic"
                  required
                  label="Cummulative Target"
                  variant="outlined"
                  onChange={(event) => {
                    setCTarget(event.target.value);
                  }}
                  value={cTarget}
                  helperText={!cTarget ? "Cummalative Target is required" : ""}
                  error={!cTarget}
                />
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Cummulative Actual"
                  required
                  variant="outlined"
                  onChange={(event) => {
                    setCActual(event.target.value);
                  }}
                  value={cActual}
                  helperText={!cActual ? "Cummulative Actual is required" : ""}
                  error={!cActual}
                />
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Good"
                  required
                  variant="outlined"
                  onChange={(event) => {
                    setGood(event.target.value);
                  }}
                  value={good}
                  helperText={!good ? "Good Target is required" : ""}
                  error={!good}
                />
              </div>
              {scrapListHtml}
              <div className="scrapForm">
                {/* {scrapList.map((index) => (
                      <div key={index}>
                      <TextField
                        type="number"
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
                    ))} */}
                <div className="plusBtn">
                  <button class="btn btn-light" onClick={newScrap}>
                    <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                    Add Reason Code
                  </button>
                </div>
              </div>
              <div>
                <TextField
                  type="number"
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
              </div>
              <div>
                <TextField
                  className="comment"
                  id="fullWidth"
                  label="Comment"
                  variant="outlined"
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                  value={comment}
                />
              </div>

              <div className="addBtn">
                <Button onClick={addTracking} class="btn btn-outline-success">
                  Submit
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
        </Col>
      </Row>
    </Container>

    // <Box
    //   className="screen"
    //   component="form"
    //   sx={{
    //     "& .MuiTextField-root": { m: 3, width: "25ch" },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <Paper className="trackingForm" elevation={3}>
    //     <div>
    //     <label style={{margin : 15}}>Area: </label>
    //       <Select className="partNum" id="dropdown" value={area} error={!area} placeholder="Area 1" onChange={(event) => {
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
    //       <label style={{margin : 15}}>Shift: </label>
    //       <Select className="partNum" id="dropdown" value={shift} error={!shift} placeholder="8:00-9:00" onChange={(event) => {
    //           setShift(event.target.value);
    //         }}>
    //         <MenuItem value="7:00-8:00 A.M.">7:00-8:00 A.M.</MenuItem>
    //         <MenuItem value="8:00-9:00 A.M.">8:00-9:00 A.M.</MenuItem>
    //         <MenuItem value="9:00-10:00 A.M.">9:00-10:00 A.M.</MenuItem>
    //         <MenuItem value="10:00-11:00 A.M.">10:00-11:00 A.M.</MenuItem>
    //         <MenuItem value="11:00-12:00 A.M.">11:00-12:00 A.M.</MenuItem>
    //         <MenuItem value="12:00-1:00 P.M.">12:00-1:00 P.M.</MenuItem>
    //         <MenuItem value="1:00-2:00 P.M.">1:00-2:00 P.M.</MenuItem>
    //         <MenuItem value="12:00-1:00 P.M.">2:00-3:00 P.M.</MenuItem>
    //         <MenuItem value="1:00-2:00 P.M.">3:00-4:00 P.M.</MenuItem>
    //         <MenuItem value="12:00-1:00 P.M.">4:00-5:00 P.M.</MenuItem>
    //       </Select>
    //     </div>

    //     <div>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DesktopDatePicker
    //           label="Date Tracked"
    //           inputFormat="MM/DD/YYYY"
    //           value={value}
    //           onChange={handleChangeDate}
    //           renderInput={(params) => <TextField {...params} />}
    //         />
    //       </LocalizationProvider>

    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <TimePicker
    //           label="Time Tracked"
    //           value={value}
    //           onChange={handleChangeTime}
    //           renderInput={(params) => <TextField {...params} />}
    //         />
    //         <TextField
    //           id="outlined-basic"
    //           required
    //           label="Work Order"
    //           variant="outlined"
    //           onChange={(event) => {
    //             setWorkOrder(event.target.value);
    //           }}
    //           value={workOrder}
    //           helperText={!workOrder
    //             ?"Work Order is required":""
    //           }
    //           error={!workOrder}
    //         />
    //       </LocalizationProvider>
    //       <label>Part Number: </label>
    //       <Select
    //         className="partNum"
    //         id="dropdown"
    //         required
    //         value={selection}
    //         placeholder="test"
    //         onChange={handleSelect}
    //         error={!selection}
    //       >
    //         <MenuItem value="Test 1">Test1</MenuItem>
    //         <MenuItem value="Test 2">Test2</MenuItem>
    //         <MenuItem value="Test 3">Test3</MenuItem>
    //       </Select>
    //     </div>
    //     <div>
    //     <TextField
    //         type="number"
    //         id="outlined-basic"
    //         required
    //         label="Target"
    //         variant="outlined"
    //         onChange={(event) => {
    //           setTarget(event.target.value);
    //         }}
    //         value={target}
    //         helperText={!target
    //           ?"Target is required":""
    //         }
    //         error={!target}
    //       />
    //       <TextField
    //         type="number"
    //         id="outlined-basic"
    //         required
    //         label="Cummulative Target"
    //         variant="outlined"
    //         onChange={(event) => {
    //           setCTarget(event.target.value);
    //         }}
    //         value={cTarget}
    //         helperText={!cTarget
    //           ?"Cummalative Target is required":""
    //         }
    //         error={!cTarget}
    //       />
    //       <TextField
    //         type="number"
    //         id="outlined-basic"
    //         label="Cummulative Actual"
    //         required
    //         variant="outlined"
    //         onChange={(event) => {
    //           setCActual(event.target.value);
    //         }}
    //         value={cActual}
    //         helperText={!cActual
    //           ?"Cummulative Actual is required":""
    //         }
    //         error={!cActual}
    //       />
    //       <TextField
    //         type="number"
    //         id="outlined-basic"
    //         label="Good"
    //         required
    //         variant="outlined"
    //         onChange={(event) => {
    //           setGood(event.target.value);
    //         }}
    //         value={good}
    //         helperText={!good
    //           ?"Good Target is required":""
    //         }
    //         error={!good}
    //       />
    //       </div>
    //       {scrapListHtml}
    //       <div className="scrapForm">
    //         {/* {scrapList.map((index) => (
    //           <div key={index}>
    //           <TextField
    //             type="number"
    //             id="outlined-basic"
    //             label="Scrap"
    //             variant="outlined"
    //             onChange={(event) => {
    //               setBad(event.target.value);
    //             }}
    //             value={bad}
    //           />
    //           <TextField
    //             id="outlined-basic"
    //             label="Reason Code"
    //             variant="outlined"
    //             onChange={(event) => {
    //               setBadCode(event.target.value);
    //             }}
    //             value={badCode}
    //           />
    //           </div>
    //         ))} */}
    //         <div className="plusBtn">
    //           <button class="btn btn-light" onClick={newScrap}><FontAwesomeIcon icon={faPlus} className="plusIcon" />Add Reason Code</button>
    //         </div>
    //       </div>
    //       <div>
    //       <TextField
    //         type="number"
    //         id="outlined-basic"
    //         label="Down Time"
    //         variant="outlined"
    //         onChange={(event) => {
    //           setDownTime(event.target.value);
    //         }}
    //         value={downTime}
    //       />
    //       <TextField
    //         id="outlined-basic"
    //         label="DTimeCode"
    //         variant="outlined"
    //         onChange={(event) => {
    //           setDTimeCode(event.target.value);
    //         }}
    //         value={dTimeCode}
    //       />
    //     </div>
    //     <div>
    //       <TextField
    //         className="comment"
    //         id="fullWidth"
    //         label="Comment"
    //         variant="outlined"
    //         onChange={(event) => {
    //           setComment(event.target.value);
    //         }}
    //         value={comment}
    //       />
    //     </div>

    //     <div className="addBtn">
    //       <Button
    //         onClick={addTracking}
    //         class="btn btn-outline-success"
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //   </Paper>

    //   {trackingList.map((val, key) => {
    //     return (
    //       <div className="tracking-display">
    //         <br />
    //         <Paper elevation={4}>
    //           <h3>operator: {val.operator}</h3>
    //           <h3>area: {val.area}</h3>
    //           <h3>shift: {val.shift}</h3>
    //           <h3>process: {val.process}</h3>
    //           <h3>date_tracked: {val.date_tracked}</h3>
    //           <h3>time_tracked: {val.time_tracked}</h3>
    //           <h3>target: {val.target}</h3>
    //           <h3>cTarget: {val.cTarget}</h3>
    //           <h3>cActual: {val.cActual}</h3>
    //           <h3>good: {val.good}</h3>
    //           <h3>bad: {val.bad}</h3>
    //           <h3>badCode: {val.badCode}</h3>
    //           <h3>downTime: {val.downTime}</h3>
    //           <h3>dTimeCode: {val.dTimeCode}</h3>
    //           <h3>comment: {val.comment}</h3>
    //         </Paper>
    //       </div>
    //     );
    //   })}
    // </Box>
  );
};

export default Tracking;
