import React from "react";
import { useState } from "react";
import Axios from "axios";

const Tracking = () => {
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

  return (
    <div className="tracking">
      <div className="type">
        <label>Type: </label>
        <input type="text" />
      </div>
    </div>
  );
};

export default Tracking;
