const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: String,
      required: true,
    },
    name: String,
    price: Number,
    image: String,
    rating: Number,
    reviews: Number,
  },
  { timestamps: true },
);

wishlistSchema.index({ user: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
