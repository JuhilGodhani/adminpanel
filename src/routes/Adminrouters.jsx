import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard_under from "../components/Dashboard_under";

const Adminrouters = () => {
  return (
    <Routes>
      <Route path="/dashboard_d" element={<Dashboard_under />}></Route>
    </Routes>
  );
};

export default Adminrouters;
