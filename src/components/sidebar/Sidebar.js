import React from "react";
import "./Sidebar.css";
const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar_title">
        <div className="sidebar_img">
          <img
            src="../media/11639648873djrwwcz5vluynavhjouvmbbv0p9u7fipechmtssjljvj35gweu4py1426hsw439wihwktmoudkgdxv59tdfnsdpmjooskdfmervu.png"
            alt="logo"
          />
          <h1>Parker</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar_menu">
        <div className="sidebar_link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="/home">Dashboard</a>
        </div>
        <h2>PRODUCTS</h2>
        <div className="sidebar_link ">
          <i className="fa fa-building-o"></i>
          <a href="/products">Add Product</a>
        </div>
        <h2>TRACKING</h2>
        <div className="sidebar_link ">
          <i className="fa fa-wrench"></i>
          <a href="/tracking">Tracking</a>
        </div>
        <div className="sidebar_link ">
          <i className="fa fa-archive"></i>
          <a href="/tracking">Previous Tracking</a>
        </div>
        <h2>Quality</h2>
        <div className="sidebar_link ">
          <i className="fa fa-handshake-o"></i>
          <a href="/quality">Quality</a>
        </div>
        <h2>SAFETY</h2>
        <div className="sidebar_link ">
          <i className="fa fa-question"></i>
          <a href="/safety">Safety</a>
        </div>
        <h2>USERS</h2>
        <div className="sidebar_link ">
          <i className="fa fa-sign-out"></i>
          <a href="/users">Users</a>
        </div>

        <div className="sidebar_logout">
          <i className="fa fa-power-off"></i>
          <a href="/">Log Out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from "cdbreact";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div
//       style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
//     >
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a
//             href="/"
//             className="text-decoration-none"
//             style={{ color: "inherit" }}
//           >
//             Sidebar
//           </a>
//         </CDBSidebarHeader>

//         <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink to="/users" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/products" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Products</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/tracking" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="chart-line">
//                 Tracking
//               </CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/safety" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="table">Safety</CDBSidebarMenuItem>
//             </NavLink>
//           </CDBSidebarMenu>
//         </CDBSidebarContent>

//         <CDBSidebarFooter style={{ textAlign: "center" }}>
//           <div
//             style={{
//               padding: "20px 5px",
//             }}
//           >
//             Sidebar Footer
//           </div>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//     </div>
//   );
// };

// export default Sidebar;
