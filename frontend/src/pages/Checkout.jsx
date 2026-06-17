import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "sonner";
const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getPrice = useMemo(
    () => (price) => Number(String(price).replace(/[^0-9]/g, "")) || 0,
    [],
  );

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + getPrice(item.price) * (item.qty || 1);
    }, 0);
  }, [cartItems, getPrice]);

  const shipping = subtotal > 50000 ? 0 : 2500;

  const total = subtotal + shipping;

  const paystackAmount = total * 100;
  const handlePaystackSuccess = async (reference) => {
    try {
      const res = await fetch(
        `${apiUrl}/api/payments/verify/${reference.reference}`,
      );
      const data = await res.json();

      const isSuccess =
        data?.status === true ||
        data?.data?.status === "success" ||
        data?.data?.data?.status === "success";

      if (!isSuccess) {
        return toast.error("Payment verification failed", {
          description: "Please try again or choose another payment method",
        });
      }

      const orderData = {
        orderId: reference.reference,
        items: cartItems,
        userInfo: form,
        pricing: { subtotal, shipping, total },
        status: "paid",
      };

      await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      dispatch(clearCart());
      toast.success("Order saved successfully!");
      navigate("/order-success", { state: { order: orderData } });
    } catch {
      toast.error("Payment verification failed", {
        description: "Please try again or choose another payment method",
      });
    }
  };
  const handlePaystackCheckout = () => {
    if (!user) return navigate("/login");

  const emailRegex = /\S+@\S+\.\S+/;

  if (!form.fullName.trim()) return toast.error("Full name is required");
  if (!emailRegex.test(form.email)) return toast.error("Invalid email");
  if (!form.phone || form.phone.length < 10) return toast.error("Invalid phone");
  if (!form.state) return toast.error("Select a state");
  if (!form.address || form.address.length < 10) return toast.error("Address too short");

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: form.email,
      amount: paystackAmount,
      currency: "NGN",

      callback: function (response) {
        handlePaystackSuccess({
          reference: response.reference,
        });
      },

      onClose: function () {
        toast.info("Payment closed");
      },
    });

    handler.openIframe();
  };

  const handlePlaceOrder = async () => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (!cartItems.length) {
      return toast.error("Cart is empty");
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!form.fullName.trim()) return toast.error("Full name is required");
    if (!emailRegex.test(form.email)) return toast.error("Invalid email");
    if (!form.phone || form.phone.length < 10)
      return toast.error("Invalid phone");
    if (!form.state) return toast.error("Select a state");
    if (!form.address || form.address.length < 10)
      return toast.error("Address too short");

    setLoading(true);

    try {
      const order = {
        orderId: `ORD-${Date.now()}`,
        items: cartItems,
        userInfo: form,
        pricing: { subtotal, shipping, total },
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(order),
      });

      const savedOrder = await res.json();

      navigate("/order-success", {
        state: { order: savedOrder },
      });

      dispatch(clearCart());
      toast.success("Order placed successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TOP NAV */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-800 font-medium hover:text-orange-600 transition mb-6"
        >
          <FaArrowLeft className="text-sm" />
          Back to Shopping
        </Link>

        <h1 className="text-3xl font-bold text-zinc-900 mb-8">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* FORM */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Shipping Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
                  placeholder="Full Name"
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
                  placeholder="Email Address"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
                  placeholder="Phone Number"
                />

                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-zinc-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select State</option>
                  <option>Abia</option>
                  <option>Adamawa</option>
                  <option>Akwa Ibom</option>
                  <option>Anambra</option>
                  <option>Bauchi</option>
                  <option>Bayelsa</option>
                  <option>Benue</option>
                  <option>Borno</option>
                  <option>Cross River</option>
                  <option>Delta</option>
                  <option>Ebonyi</option>
                  <option>Edo</option>
                  <option>Ekiti</option>
                  <option>Enugu</option>
                  <option>FCT (Abuja)</option>
                  <option>Gombe</option>
                  <option>Imo</option>
                  <option>Jigawa</option>
                  <option>Kaduna</option>
                  <option>Kano</option>
                  <option>Katsina</option>
                  <option>Kebbi</option>
                  <option>Kogi</option>
                  <option>Kwara</option>
                  <option>Lagos</option>
                  <option>Nasarawa</option>
                  <option>Niger</option>
                  <option>Ogun</option>
                  <option>Ondo</option>
                  <option>Osun</option>
                  <option>Oyo</option>
                  <option>Plateau</option>
                  <option>Rivers</option>
                  <option>Sokoto</option>
                  <option>Taraba</option>
                  <option>Yobe</option>
                  <option>Zamfara</option>
                </select>
              </div>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
                className="w-full mt-4 border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600"
                rows="4"
                placeholder="Delivery Address"
              />
            </div>

            {/* INFO */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <h2 className="font-semibold mb-3">Delivery Options</h2>
              <p className="text-sm text-zinc-600">
                Standard (2–5 days) • Express (1–2 days) • Free above ₦50,000
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3">Payment Method</h2>

              <div className="space-y-3 text-sm">
                {/* COD */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Pay on Delivery
                </label>

                {/* CARD */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  Card Payment
                </label>
              </div>

              {paymentMethod === "card" ? (
                <button
                  onClick={handlePaystackCheckout}
                  disabled={!form.email || !cartItems.length || loading}
                  className="w-full mt-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                  Pay with Card
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !cartItems.length}
                  className="w-full mt-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-5">Order Summary</h2>

            <div className="space-y-3">
              {cartItems.map((item) => {
                const price = getPrice(item.price);
                const qty = item.qty || 1;

                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {qty}
                    </span>
                    <span>₦{(price * qty).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <hr className="my-4 border-zinc-400" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping ? `₦${shipping}` : "Free"}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={
                loading || !cartItems.length || paymentMethod === "card"
              }
              className={`w-full mt-6 py-3 rounded-lg cursor-pointer transition-colors ${
                loading || !cartItems.length
                  ? "bg-zinc-300"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

            <p className="text-xs text-center text-zinc-500 mt-4">
              Secure checkout • Encrypted payment • Fast delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
