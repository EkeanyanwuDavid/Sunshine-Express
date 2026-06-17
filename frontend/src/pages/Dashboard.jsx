import React, { useEffect, useState } from "react";
import {
  FaTshirt,
  FaMobileAlt,
  FaAppleAlt,
  FaCouch,
  FaFireAlt,
  FaSearch,
  FaStar,
  FaTruck,
  FaLock,
  FaHeadset,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { products } from "../data/product";
import Glasses from "../assets/giorgio-trovato-K62u25Jk6vo-unsplash.jpg";
import Bag from "../assets/jakob-owens-O_bhy3TnSYU-unsplash.jpg";
import Shoes from "../assets/mohammad-metri-E-0ON3VGrBc-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FlashTimer from "../components/FlashTimer";
const Dashboard = () => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const slides = [Glasses, Bag, Shoes];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HERO */}
      <section className="px-6 pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-sm border border-zinc-200">
            <img
              src={slides[index]}
              alt=""
              className="w-full h-full object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="text-white p-8 max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Shop Smart. Shop Fast
                </h1>

                <p className="mt-3 text-zinc-200 text-sm">
                  Everything you need delivered at your doorstep.
                </p>

                <button className="mt-5 px-6 py-3 bg-orange-600 rounded-xl hover:bg-orange-700 cursor-pointer transition">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SEARCH BAR */}
      <section className="px-6 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />

            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Fashion", icon: <FaTshirt /> },
              { name: "Electronics", icon: <FaMobileAlt /> },
              { name: "Groceries", icon: <FaAppleAlt /> },
              { name: "Home", icon: <FaCouch /> },
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-200 rounded-xl p-6 text-center hover:shadow-sm transition "
              >
                <div className="text-orange-600 text-2xl flex justify-center">
                  {cat.icon}
                </div>

                <p className="mt-2 text-sm font-medium text-zinc-700">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800">
            Trending Deals
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistItems.some(
                (item) => item.productId === String(product.id),
              );
              return (
                <div
                  key={product.id}
                  className="relative min-w-45 bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-sm transition"
                >
                  <button
                    onClick={async () => {
                      if (!user) {
                        toast.error("Please log in to use your wishlist");
                        return navigate("/login");
                      }

                      try {
                        if (isWishlisted) {
                          await dispatch(
                            removeFromWishlist(String(product.id)),
                          ).unwrap();
                          toast.info("Removed from wishlist");
                        } else {
                          await dispatch(addToWishlist(product)).unwrap();
                          toast.success("Added to wishlist");
                        }
                      } catch {
                        toast.error("Something went wrong, please try again");
                      }
                    }}
                    className="absolute top-3 right-3 outline-none cursor-pointer z-10 bg-white/90 p-2 rounded-full shadow text-red-500 hover:scale-110 transition"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>

                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      className="w-full object-cover h-32"
                      alt={product.name}
                    />

                    <div className="p-3">
                      <h3 className="text-sm font-medium text-zinc-800">
                        {product.name}
                      </h3>

                      <p className="text-orange-600 font-semibold text-sm mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  <div className="px-3 pb-3">
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate("/login");
                          return;
                        }

                        dispatch(addToCart(product));
                        toast.success("Added to cart");
                      }}
                      className="w-full py-2 text-xs bg-orange-600 text-white outline-none cursor-pointer rounded-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-800 text-white rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl flex items-center gap-2 font-bold">
                Weekend Mega Sale <FaFireAlt color="orange" />
              </h3>

              <p className="text-zinc-300 mt-2">Up to 50% off selected items</p>
            </div>

            <button className="mt-4 md:mt-0 px-6 py-3 bg-orange-600 cursor-pointer hover:bg-orange-500 transition rounded-xl">
              Explore Deals
            </button>
          </div>
        </div>
      </section>
      <FlashTimer />
      {/* FEATURED */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800">
            Featured Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((product) => {
                const isWishlisted = wishlistItems.some(
                  (item) => item.productId === String(product?.id),
                );

                return (
                  <div
                    key={product.id}
                    className="relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    <button
                      onClick={async () => {
                        if (!user) {
                          toast.error("Please log in to use your wishlist");
                          return navigate("/login");
                        }

                        try {
                          if (isWishlisted) {
                            await dispatch(
                              removeFromWishlist(String(product.id)),
                            ).unwrap();
                            toast.info("Removed from wishlist");
                          } else {
                            await dispatch(addToWishlist(product)).unwrap();
                            toast.success("Added to wishlist");
                          }
                        } catch {
                          toast.error("Something went wrong, please try again");
                        }
                      }}
                      className="absolute top-3 right-3 outline-none cursor-pointer z-10 bg-white/90 p-2 rounded-full shadow text-red-500 hover:scale-110 transition"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>

                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        className="w-full h-36 object-cover"
                        alt={product.name}
                      />

                      <div className="p-3">
                        <h3 className="text-sm font-medium text-zinc-800">
                          {product.name}
                        </h3>

                        <p className="text-orange-600 font-semibold text-sm mt-1">
                          ₦{product.price.toLocaleString()}
                        </p>

                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                          <FaStar className="text-orange-500" />
                          {product.rating} ({product.reviews} reviews)
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">
              Why Shop With Us
            </h2>
            <p className="text-sm text-zinc-500 mt-2">
              Everything we do is designed to give you a better shopping
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center hover:shadow-sm transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                <FaTruck className="text-orange-600 text-xl" />
              </div>
              <h3 className="font-semibold text-zinc-900">Fast Delivery</h3>
              <p className="text-sm text-zinc-500 mt-2">
                Get your orders delivered quickly and reliably to your doorstep.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center hover:shadow-sm transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                <FaLock className="text-orange-600 text-xl" />
              </div>
              <h3 className="font-semibold text-zinc-900">Secure Payment</h3>
              <p className="text-sm text-zinc-500 mt-2">
                Your transactions are protected with safe and trusted checkout
                systems.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center hover:shadow-sm transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                <FaHeadset className="text-orange-600 text-xl" />
              </div>
              <h3 className="font-semibold text-zinc-900">24/7 Support</h3>
              <p className="text-sm text-zinc-500 mt-2">
                Our support team is always available to assist you anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
