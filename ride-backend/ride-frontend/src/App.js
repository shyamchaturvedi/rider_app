import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RideForm from "./components/RideForm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>🏠 Home</Link>
        <Link to="/login" style={{ margin: "0 10px" }}>🔐 Login</Link>
        <Link to="/register" style={{ margin: "0 10px" }}>📝 Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RideForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
