import React from "react";
import "./Sidebar.css";
import { test } from "../../App";
// const Sidebar = ({ sidebarOpen, closeSidebar }) => {
//   return (
//     <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
//       <div className="sidebar_title">
//         <div className="sidebar_img">
//           <img
//             className="logo"
//             width={100}
//             height={100}
//             src={require("../../ParkerLogo.png")}
//             alt="Part Production Dashboard"
//           />
//         </div>
//         <i
//           className="fa fa-times"
//           id="sidebarIcon"
//           onClick={() => closeSidebar()}
//         ></i>
//       </div>

//       <div className="sidebar_menu">
//         <div className="sidebar_link active_menu_link">
//           <i className="fa fa-home"></i>
//           <a href="/dashboard">Dashboard</a>
//         </div>
//         <h2>PRODUCTS</h2>
//         <div className="sidebar_link ">
//           <i className="fa fa-building-o"></i>
//           <a href="/products">Add Product</a>
//         </div>
//         <h2>TRACKING</h2>
//         <div className="sidebar_link ">
//           <i className="fa fa-wrench"></i>
//           <a href="/tracking">Tracking</a>
//         </div>
//         <div className="sidebar_link ">
//           <i className="fa fa-archive"></i>
//           <a href="/Ptracking">Previous Tracking</a>
//         </div>
//         <h2>Quality</h2>
//         <div className="sidebar_link ">
//           <i className="fa fa-handshake-o"></i>
//           <a href="/quality">Quality</a>
//         </div>
//         <h2>SAFETY</h2>
//         <div className="sidebar_link ">
//           <i className="fa fa-question"></i>
//           <a href="/safety">Safety</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import ClickOutside from "./ClickOutside";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { fontStyle } from "@mui/system";

// const sideBar = () => {
//     const navigate = useNavigate();
//   const handleSelect = (selected) => {
//   navigate("/" + selected);
// };
// }
// sideBar;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  

  render() {
    return (
      // <SideNav expanded={this.state.isVisible}>
      //   <SideNav.Toggle
      //     onClick={() => {
      //       this.setState({ isVisible: !this.state.isVisible });
      //     }}

      //   />
      //   <SideNav.Nav defaultSelected="Dashboard">
      //     <NavItem eventKey="Dashboard" to="/home">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>Dashboard</NavText>
      //     </NavItem>
      //     <NavItem eventKey="Add Product" href="/products">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>Add Product</NavText>
      //     </NavItem>
      //     <NavItem eventKey="Tracking" href="/tracking">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>Tracking</NavText>
      //     </NavItem>
      //     <NavItem eventKey="Previous Tracking">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavLink to="/Ptracking">Previous Tracking</NavLink>
      //     </NavItem>
      //     <NavItem eventKey="Quality" href="/quality">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>Quality</NavText>
      //     </NavItem>
      //     <NavItem eventKey="Safety" href="/safety">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>Safety</NavText>
      //     </NavItem>
      //   </SideNav.Nav>
      // </SideNav>

      <ClickOutside
        onClickOutside={() => {
            document.getElementById("sidebar").style.width = '174px'
            this.setState({ expanded: false });
        }}
>
        <SideNav 
            className="test"
            id="sideBar"
            expanded={this.state.expanded}
            onToggle={(expanded) => {
                this.setState({ expanded });
                if (this.state.expanded == false) {
                  document.getElementById("sidebar").style.width = '240px'
                } else {
                  document.getElementById("sidebar").style.width = '174px'
                }
            }}
        >
        <SideNav.Toggle />
          <SideNav.Nav defaultSelected="Dashboard">
            <img
              className="logo"
              width={100}
              height={100}
              src={require("../../ParkerLogo.png")}
              alt="Part Production Dashboard"
            />
            <LinkContainer to="/" activeClassName="active">
              <NavItem eventKey="Dashboard">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Dashboard</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/products">
              <NavItem eventKey="Add Product" href="/products">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-line-chart"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Add Product</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/tracking">
              <NavItem eventKey="Tracking" href="/tracking">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-wrench"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Tracking</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/Ptracking">
              <NavItem eventKey="Previous Tracking">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-archive"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Previous Tracking</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/quality">
              <NavItem eventKey="Quality" href="/quality">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-question"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Quality</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/safety">
              <NavItem eventKey="Safety" href="/safety">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-handshake-o"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Safety</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/pSafety">
              <NavItem eventKey="pSafety" href="/pSafety">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-archive"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Previous Safety</NavText>
              </NavItem>
            </LinkContainer>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }
}

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
