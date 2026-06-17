import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">Sunshine Express</h2>
          <p className="text-sm mt-3 text-zinc-400">
            Your trusted online store for fashion, electronics, and everyday
            essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/resgister" className="hover:text-orange-500">
                Register
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Fashion</li>
            <li className="hover:text-orange-500 cursor-pointer">
              Electronics
            </li>
            <li className="hover:text-orange-500 cursor-pointer">Groceries</li>
            <li className="hover:text-orange-500 cursor-pointer">Home</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>

          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope />
            <span>support@sunshineexpress.com</span>
          </div>

          <div className="flex gap-3 mt-4">
            <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
            <FaTwitter className="hover:text-orange-500 cursor-pointer" />
            <FaInstagram className="hover:text-orange-500 cursor-pointer" />
            <FaTiktok className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Sunshine Express. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
