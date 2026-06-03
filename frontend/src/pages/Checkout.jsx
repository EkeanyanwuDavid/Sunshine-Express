import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const getPrice = (price) => {
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = getPrice(item.price);
    const qty = item.qty || 1;

    return acc + price * qty;
  }, 0);

  const shipping = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className=" mb-8 inline-flex items-center gap-2 text-zinc-800 font-medium hover:text-orange-600 transition "
        >
          <FaArrowLeft className="text-sm" />
          Back to Shopping
        </Link>

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
              <input
                type="phone"
                placeholder="Phone Number"
                className="border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <textarea
              placeholder="Delivery Address"
              rows="4"
              className="w-full mt-4 border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-5">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item) => {
                const price = getPrice(item.price);
                const qty = item.qty || 1;

                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {qty}
                    </span>

                    <span>₦{(price * qty).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <hr className="my-5" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-zinc-900">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded cursor-pointer transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
