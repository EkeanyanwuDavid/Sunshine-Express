import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl font-bold">
              404 Not Found
            </h1>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar
        theme="dark"
        bodyClassName={() => "text-sm font-medium"}
        progressClassName={() => "bg-orange-500"}
        toastClassName={() =>
          "relative flex p-4 rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 text-white shadow-2xl border border-zinc-800"
        }
      />
    </BrowserRouter>
  );
}

export default App;
