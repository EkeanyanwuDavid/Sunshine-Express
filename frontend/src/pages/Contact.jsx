import React, { useState } from "react";
import {
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkedAlt,
  FaClock,
  FaPaperPlane,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

import { toast } from "sonner";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      return toast.error("Please fill in all fields");
    }
    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-orange-600 text-white py-16 px-6 text-center">
        <FaHeadset className="text-5xl mx-auto mb-4" />

        <h1 className="text-4xl font-bold mb-3">Contact us</h1>

        <p className="max-w-2xl mx-auto text-white/90">
          Need help with an order, deliver, or product inquiry? Our support team
          is always ready to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-zinc-200 text-center">
            <FaPhoneAlt className="text-2xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-zinc-500">+234 800 123 4567</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200 text-center">
            <FaEnvelope className="text-2xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-zinc-500">support@sunshineexpress.com</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200 text-center">
            <FaMapMarkedAlt className="text-2xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm text-zinc-500">Port Harcourt, Nigeria</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-zinc-200 text-center">
            <FaClock className="text-2xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-sm text-zinc-500">Mon - Sat, 8am - 6pm</p>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-zinc-300 px-4 py-3 outline-none rounded-lg focus:border-orange-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-zinc-300 px-4 py-3 rounded-lg outline-none focus:border-orange-500"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border border-zinc-300 px-4 py-3 rounded-lg outline-none focus:border-orange-500"
            />

            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
            ></textarea>

            <button
              type="submit"
              className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                How long does delivery take?
              </h3>
              <p className="text-sm text-zinc-500">
                Standard delivery typically takes 2-5 business days.
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5">
              <h3 className="font-semibold mb-2">Can I return a product?</h3>
              <p className="text-sm text-zinc-500">
                Yes.Eligible items can be returned according to our return
                policy.
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-5">
              <h3 className="font-semibold mb-2">How can I track my order?</h3>
              <p className="text-sm text-zinc-500">
                Contact our support team with your Order ID for updates.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center">
            <FaTruck className="text-3xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold">Fast Delivery</h3>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center">
            <FaShieldAlt className="text-3xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold">Secure Checkout</h3>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center">
            <FaUndo className="text-3xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold">Easy Returns</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
