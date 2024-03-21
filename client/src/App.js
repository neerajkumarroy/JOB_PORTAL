import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import DashBoard from "./Pages/DashBoard.js";
import NotFound from "./Pages/NotFound.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
