import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

