import { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { FaTimes, FaBoxOpen } from "react-icons/fa";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasShownError = useRef(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/orders`);

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);

        if (!hasShownError.current) {
          toast.error("Could not load orders", {
            description: "Try again",
          });

          hasShownError.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedOrder(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
        <ClipLoader size={45} color="#ea580c" />
        <p className="text-zinc-600 font-medium">Loading ...</p>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderId
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID..."
          className="w-full md:w-1/2 border border-zinc-200 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 border border-zinc-200 rounded-lg outline-none px-4 py-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-100 text-center">
          <FaBoxOpen className="mx-auto text-5xl text-zinc-400" />

          <h2 className="text-lg font-semibold text-zinc-800 mt-4">
            No orders yet
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            You haven’t placed any orders. Start shopping to see them here.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-5 px-5 py-2 bg-orange-600 cursior-pointer text-white rounded hover:bg-orange-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-zinc-200  rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="font-semibold">Order #{order.orderId}</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <p className="text-sm text-zinc-500 mt-1">
                    {order.userInfo?.fullName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₦{order.pricing?.total?.toLocaleString()}
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <hr className="my-4 border-zinc-200" />

              <div className="flex justify-between text-sm text-zinc-600">
                <span>{order.items?.length} item(s)</span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-orange-600 outline-none hover:underline cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">
                  Order #{selectedOrder.orderId}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-red-500 transition"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* USER INFO CARD */}
            <div className="bg-zinc-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-bold text-zinc-800">
                {selectedOrder.userInfo?.fullName}
              </p>
              <p className="text-xs text-zinc-500">
                {selectedOrder.userInfo?.email}
              </p>
              <p className="text-xs text-zinc-500">
                {selectedOrder.userInfo?.phone}
              </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-700">Items</h3>

              {selectedOrder.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm border-b border-zinc-200 pb-2"
                >
                  <span className="text-zinc-700 font-medium">
                    {item.name} × {item.qty}
                  </span>

                  <span className="font-medium">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-5 flex justify-between items-center">
              <span className="text-sm text-zinc-500">Total</span>
              <span className="text-lg font-bold">
                ₦{selectedOrder.pricing?.total?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
