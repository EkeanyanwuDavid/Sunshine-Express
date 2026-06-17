import React from "react";
import {
  FaTruck,
  FaShieldAlt,
  FaSmile,
  FaUndo,
  FaStar,
  FaRegStar,
  FaCheckCircle,
} from "react-icons/fa";

import ChineduAvatar from "../assets/62caf0b1-2705-4f51-8aeb-0c1ab3bc11cf.jpeg";
import AishaAvatar from "../assets/704a4cde-790e-4d7d-88b6-62a4d53c2a91.jpeg";
import WilliamAvatar from "../assets/be1544c2-64d2-4722-b491-40d376446856.jpeg";
import DaichiAvatar from "../assets/Screenshot (1).png";
import ChisomAvatar from "../assets/Screenshot (3).png";
import MunaAvatar from "../assets/Screenshot (2).png";
const testimonials = [
  {
    name: "Chinedu",
    text: "Fast delivery and original products. I got my order a day earlier!",
    location: "Port Harcourt",
    rating: 5,
    avatar: ChineduAvatar,
    date: "March 12, 2026",
    verified: true,
  },
  {
    name: "Aisha",
    text: "Customer service is excellent. very smooth checkout experience.",
    location: "Abuja",
    rating: 4,
    avatar: AishaAvatar,
    date: "February 28, 2026",
    verified: false,
  },
  {
    name: "William",
    text: "Best online store I've used, Everything was easy and reliable.",
    location: "Lagos",
    rating: 4,
    avatar: WilliamAvatar,
    date: "January 12, 2026",
    verified: false,
  },
  {
    name: "Daichi",
    text: "Everything was easy and reliable, Navigating was so easy.",
    location: "Ogun state",
    rating: 5,
    avatar: DaichiAvatar,
    date: "June 11, 2026",
    verified: true,
  },
  {
    name: "Chisom",
    text: "The Contact and support team were so reliable and ready to answer.",
    location: "Ebonyi state",
    rating: 4,
    avatar: ChisomAvatar,
    date: "May 21, 2026",
    verified: false,
  },
  {
    name: "Muna",
    text: "Good and exceptional products at good rates.",
    location: "Owerri",
    rating: 5,
    avatar: MunaAvatar,
    date: "March 17, 2026",
    verified: true,
  },
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <FaStar key={i} className="text-yellow-400" />
    ) : (
      <FaRegStar key={i} className="text-zinc-300" />
    ),
  );
};
const About = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-orange-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">About Sunshine Express</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          We are a modern ecommerce platform built to deliver quality product
          fast, safely, and affordably across Nigeria.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
        <p className="text-zinc-400 leading-relaxed">
          Sunshine Express is dedicated to make online shopping simple,
          reliable, and accessible. We connect customers to quality products
          with a smooth checkout experience, fast delivery, and secure payment
          options. Our goal is to make ecommerce feel effortless.
        </p>
      </div>

      <div className="bg-white border-y border-zinc-200 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaTruck className="text-3xl text-orange-600" />
            <p className="font-semibold">Fast Delivery</p>
            <p className="text-sm text-zinc-500">Nationwide Shipping</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaShieldAlt className="text-3xl text-orange-600" />
            <p className="font-semibold">Secure Checkout</p>
            <p className="text-sm text-zinc-500">Safe payments</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaSmile className="text-3xl text-orange-600" />
            <p className="font-semibold">Happy Customers</p>
            <p className="text-sm text-zinc-500">Trusted service</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaUndo className="text-3xl text-orange-600" />
            <p className="font-semibold">Easy Returns</p>
            <p className="text-sm text-zinc-500">Hassle-free policy</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-zinc-200"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-zinc-900 font-semibold">{t.name}</h3>
                    {t.verified && (
                      <span className="flex items-center gap-1 text-xs font-medium text-blue-600">
                        <FaCheckCircle />
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-zinc-500">{t.location}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-3">{renderStars(t.rating)}</div>

              <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                "{t.text}"
              </p>

              <p className="text-xs text-zinc-400">{t.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
