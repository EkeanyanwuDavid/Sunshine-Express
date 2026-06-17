import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreasedQty,
  fetchCart,
  resetCartState,
} from "../features/cart/cartSlice";
import {
  fetchWishlist,
  clearWishlist,
} from "../features/wishlist/wishlistSlice";
import Navbar from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Order from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import ScrollToTop from "./components/ScrolltoTop";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl font-bold">
              404 Not Found
            </h1>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
        expand
        toastOptions={{
          classNames: {
            toast:
              "bg-white border border-orange-100 rounded-2xl p-4 min-w-[360px]",
            title: "text-zinc-900 font-semibold text-base",
            description: "text-zinc-500 text-sm mt-1",
            closeButton:
              "bg-zinc-100 border-0 text-zinc-500 hover:bg-orange-100 hover:text-orange-600",
            success: "border-1-4 border-1-orange-600",
            error: "border-1-4 border-1-red-500",
            warning: "border-1-4 border-1-yellow-500",
            info: "border-1-4 border-1-orange-500",
          },
        }}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
