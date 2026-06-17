import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaStar, FaHeart } from "react-icons/fa";
import {
  removeFromWishlist,
  fetchWishlist,
} from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchWishlist());
  }, [user, navigate, dispatch]);
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <FaHeart className="animate-pulse text-red-500 text-2xl" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-zinc-800">
            Your wishlist is empty
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Save products you like by tapping the heart icon. They’ll show up
            here.
          </p>

          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900">Your Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium text-zinc-800 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-orange-600 font-semibold mt-1">
                    ₦{product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                    <FaStar className="text-orange-500" />
                    {product.rating} ({product.reviews})
                  </div>
                </div>
              </Link>

              <div className="px-3 pb-3">
                <button
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  className="w-full flex items-center justify-center gap-2 py-2 cursor-pointer outline-none text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
