import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Home from "./components/Home";
import Register from "./components/Register";
import ClientsReport from "./components/ReportsTables/ClientsReport";
import SalesReport from "./components/ReportsTables/SalesReport";
import PerItemReport from "./components/ReportsTables/PerItemReport";
import CheckPerItemReport from "./components/SpecificReports/CheckPerItemReport";
import GenerateReport from "./components/GenerateReport/GenerateReport";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/ClientsReport" element={<ClientsReport />} />
          <Route exact path="/SalesReport" element={<SalesReport />} />
          <Route exact path="/PerItemReport" element={<PerItemReport />} />
          <Route exact path="/CheckPerItemReport" element={<CheckPerItemReport />} />
          <Route exact path="/GenerateReport" element={<GenerateReport />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

