import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
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
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        closeButton={false}
        hideProgressBar={false}
        limit={3}
      />
    </BrowserRouter>
  );
}

export default App;
