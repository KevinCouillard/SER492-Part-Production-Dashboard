import "./App.css";

import Home from "./routes/Home";
import Users from "./routes/Users";
import Products from "./routes/Products";
import Safety from "./routes/Safety";
import Tracking from "./routes/Tracking";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quality from "./routes/Quality";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <Router>
      <div className="container">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/quality" element={<Quality />} />
        </Routes>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
    </Router>
  );
};

export default App;
