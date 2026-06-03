import React, { useEffect, useState } from "react";
import {
  FaTshirt,
  FaMobileAlt,
  FaAppleAlt,
  FaCouch,
  FaFireAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { products } from "../data/product";
import Glasses from "../assets/giorgio-trovato-K62u25Jk6vo-unsplash.jpg";
import Bag from "../assets/jakob-owens-O_bhy3TnSYU-unsplash.jpg";
import Shoes from "../assets/mohammad-metri-E-0ON3VGrBc-unsplash.jpg";

const Dashboard = () => {
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
                className="bg-white border border-zinc-200 rounded-xl p-6 text-center hover:shadow-sm transition cursor-pointer"
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
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="min-w-45 bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-sm transition"
              >
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

                  <button className="mt-2 w-full py-2 text-xs bg-orange-600 cursor-pointer text-white rounded-lg hover:bg-orange-700 transition">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
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
    </div>
  );
};

export default Dashboard;
