import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Homepage from "../pages/Homepage";
import Dashboard from "../pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME_PAGE} element={<Homepage />} />
        <Route path={routes.DASHBOARD} element={<Dashboard />} />
        <Route path="*" element={<div>Nahi jane dunga</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
