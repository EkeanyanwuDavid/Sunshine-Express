import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaHome,
  FaShoppingBag,
} from "react-icons/fa";

const generateOrderId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  return `ORD-${randomNum}-${randomLetter}`;
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderId] = useState(() => generateOrderId());

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const order = orders[orders.length - 1];

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center max-w-md w-full shadow-sm">
        {/* SUCCESS ICON */}
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-3" />

        <h1 className="text-2xl font-bold text-zinc-900">Order Confirmed</h1>

        <p className="text-sm text-zinc-500 mt-2">
          Your order has been successfully placed
        </p>

        {/* ORDER INFO CARD */}
        <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <FaBoxOpen className="text-orange-600" />
            Order Details
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            Order ID:{" "}
            <span className="font-medium text-zinc-700">{orderId}</span>
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Items: {order.items?.length || 0}
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Total: ₦{order.pricing?.total?.toLocaleString()}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            <FaHome />
            Home
          </Link>
        </div>

        <p className="text-xs text-zinc-400 mt-5">
          You’ll receive an update when your order is processed
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
