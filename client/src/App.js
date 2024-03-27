import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import DashBoard from "./Pages/DashBoard.js";
import NotFound from "./Pages/NotFound.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import PublicRoute from "./components/routes/PublicRoute.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
