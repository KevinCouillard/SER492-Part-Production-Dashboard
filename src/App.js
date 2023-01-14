import "./App.css";

import Home from "./routes/Home";
import Users from "./routes/Users";
import Products from "./routes/Products";
import Safety from "./routes/Safety";
import Tracking from "./routes/Tracking";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
