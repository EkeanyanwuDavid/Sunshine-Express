const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

// create order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// get single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    console.log("ORDER ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
