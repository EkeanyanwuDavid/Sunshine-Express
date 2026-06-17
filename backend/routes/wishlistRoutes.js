const express = require("express");
const Wishlist = require("../models/wishlistModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// get logged-in user's wishlist
router.get("/", protect, async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add item to wishlist
router.post("/", protect, async (req, res) => {
  try {
    const { productId, name, price, image, rating, reviews } = req.body;

    const existing = await Wishlist.findOne({ user: req.user._id, productId });
    if (existing) return res.status(200).json(existing);

    const item = await Wishlist.create({
      user: req.user._id,
      productId,
      name,
      price,
      image,
      rating,
      reviews,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// remove item from wishlist
router.delete("/:productId", protect, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user._id,
      productId: req.params.productId,
    });

    res.json({ productId: req.params.productId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
