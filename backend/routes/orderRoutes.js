const express = require("express");
const Order = require("../models/orderModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// create order
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user._id });
    res.status(201).json(order);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// get logged-in user's orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// get single order (only if it belongs to the logged-in user)
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
