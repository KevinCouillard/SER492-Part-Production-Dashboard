import "./Navbar.css";
import React from "react";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        {/* <a href="/">Subscribers</a>
        <a href="/">Videos</a>
        <a className="active_link" href="/">
          Admin
        </a> */}
      </div>
      <div className="navbar_right">
        <a href="/">
          <i className="fa fa-search"></i>
        </a>
        <a href="/">
          <i className="fa fa-clock-o"></i>
        </a>
        <a href="/">
          <img
            width="30"
            src="../media/11639648873djrwwcz5vluynavhjouvmbbv0p9u7fipechmtssjljvj35gweu4py1426hsw439wihwktmoudkgdxv59tdfnsdpmjooskdfmervu.png"
            alt="avatar"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
