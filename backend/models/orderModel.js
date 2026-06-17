const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderId: String,
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    userInfo: {
      fullName: String,
      email: String,
      phone: String,
      state: String,
      address: String,
    },
    pricing: {
      subtotal: Number,
      shipping: Number,
      total: Number,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
