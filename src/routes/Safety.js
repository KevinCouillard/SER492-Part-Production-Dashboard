import React from "react";
import { useState } from "react";
import Axios from "axios";

const Safety = () => {
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
    <div className="safety">
      <div className="type">
        <label>Type: </label>
        <input
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
      </div>
      <div className="area">
        <label>Area: </label>
        <input
          type="text"
          onChange={(event) => {
            setArea(event.target.value);
          }}
        />
      </div>
      <div className="incident_date">
        <label>incident_date: </label>
        <input
          type="text"
          onChange={(event) => {
            setIncident_date(event.target.value);
          }}
        />
      </div>
      <div className="process">
        <label>process: </label>
        <input
          type="text"
          onChange={(event) => {
            setProcess(event.target.value);
          }}
        />
      </div>
      <div className="originName">
        <label>originName: </label>
        <input
          type="text"
          onChange={(event) => {
            setOriginName(event.target.value);
          }}
        />
      </div>
      <div className="approveName">
        <label>approveName: </label>
        <input
          type="text"
          onChange={(event) => {
            setApproveName(event.target.value);
          }}
        />
      </div>
      <div className="description">
        <label>description: </label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <div className="escalationName">
        <label>escalationName: </label>
        <input
          type="text"
          onChange={(event) => {
            setEscalationName(event.target.value);
          }}
        />
      </div>
      <div className="targetDate">
        <label>targetDate: </label>
        <input
          type="text"
          onChange={(event) => {
            setTargetDate(event.target.value);
          }}
        />
      </div>
      <div className="resolveDate">
        <label>resolveDate: </label>
        <input
          type="text"
          onChange={(event) => {
            setResolveDate(event.target.value);
          }}
        />
      </div>
      <button onClick={getSafety}>Get Safety Report</button>
      <button onClick={addSafety}>Add Safety Report</button>

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
  );
};

export default Safety;
