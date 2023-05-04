import "./Navbar.css";
import React from "react";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        {/* <img
          className="logo"
          width={100}
          height={100}
          src={require("../../ParkerLogo.png")}
          alt="Part Production Dashboard"
        /> */}
        <a id="title">Part Production Dashboard</a>
      </div>
      <div className="navbar_right">
        <div className="navbar_logout">
          <i className="fa fa-power-off"></i>
          <a href="/login">Log Out</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
