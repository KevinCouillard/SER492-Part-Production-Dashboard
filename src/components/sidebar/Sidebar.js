import React from "react";
import "./Sidebar.css";
import { test } from "../../App";
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

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    return (
      <ClickOutside
        onClickOutside={() => {
          document.getElementById("sidebar").style.width = "174px";
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
              document.getElementById("sidebar").style.width = "240px";
            } else {
              document.getElementById("sidebar").style.width = "174px";
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
            <LinkContainer to="/dashboard" activeClassName="active">
              <NavItem eventKey="Dashboard">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-bar-chart"
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
                    className="fa fa-fw fa-plus"
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
                    className="fa fa-fw fa-list"
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
                    className="fa fa-fw fa-folder"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText style={{ color: "orange" }}>Previous Tracking</NavText>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/safety">
              <NavItem eventKey="Safety" href="/safety">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-medkit"
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
                    className="fa fa-fw fa-folder"
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
