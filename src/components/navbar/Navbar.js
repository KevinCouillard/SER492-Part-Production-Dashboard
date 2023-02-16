import "./Navbar.css";
import React from "react";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar_left">
        <img
            src="../media/11639648873djrwwcz5vluynavhjouvmbbv0p9u7fipechmtssjljvj35gweu4py1426hsw439wihwktmoudkgdxv59tdfnsdpmjooskdfmervu.png"
            width={50}
            height={50}
            alt="logo"
          />
      </div>
      <div className="navbar_right">
      <div className="navbar_logout">
          <i className="fa fa-power-off"></i>
          <a href="/">Log Out</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
