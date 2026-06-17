import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaCheckCircle,
  FaInfoCircle,
  FaUserPlus,
  FaTruck,
  FaUndo,
  FaLock,
  FaBox,
} from "react-icons/fa";
import { products } from "../data/product";
import { useNavigate } from "react-router-dom";
import { addToCart, setProductQty } from "../features/cart/cartSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

const Products = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { productQty } = useSelector((state) => state.cart);

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [quantity, setQuantity] = useState(1);

  const productId = String(id);

  const product = products.find((item) => String(item.id) === productId);

  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product?.id,
  );
  const savedQty = productQty?.[productId];

  useEffect(() => {
    setQuantity(savedQty ?? 1);
  }, [savedQty]);
  useEffect(() => {
    if (productId && quantity > 0) {
      dispatch(setProductQty({ productId, qty: quantity }));
    }
  }, [productId, quantity, dispatch]);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-zinc-700">Product not found</h1>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!user) {
      toast.info("Sign up to continue");
      setTimeout(() => {
        navigate("/register");
      }, 1200);

      return;
    }

    dispatch(addToCart(product));
    navigate("/checkout");
  };
  const handleAddCart = () => {
    if (!user) {
      toast.info(
        <div className="flex items-center gap-2">
          <FaUserPlus className="text-lg shrink-0" />
          <span>Sign up to add items to your cart</span>
        </div>,
      );

      console.log(quantity, setQuantity);

      setTimeout(() => {
        navigate("/register");
      }, 1200);

      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    toast.success(
      <div className="flex items-center gap-2">
        <FaShoppingCart />
        <span>
          {quantity} {quantity > 1 ? "items" : "item"} added to cart
        </span>
      </div>,
    );

    setQuantity(1);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-800 font-medium hover:text-orange-600 transition"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Shopping</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-125 object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            {/* HEADER: category + title + wishlist */}
            <div className="flex justify-between items-start gap-4">
              <div>
                {product.category && (
                  <span className="text-sm font-medium text-orange-600">
                    {product.category}
                  </span>
                )}

                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-900">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => {
                  if (isWishlisted) {
                    dispatch(removeFromWishlist(product.id));
                    toast.info("Removed from wishlist");
                  } else {
                    dispatch(addToWishlist(product));
                    toast.success("Added to wishlist");
                  }
                }}
                className="p-3 rounded-full border outline-none cursor-pointer bg-white/90 hover:scale-110 border-zinc-100 hover:bg-red-50 transition"
              >
                <FaHeart
                  className={`transition ${
                    isWishlisted ? "text-red-500" : "text-zinc-400"
                  }`}
                />
              </button>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 mt-4 text-orange-500">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <FaStar key={i} />
              ))}

              <span className="ml-2 text-sm text-zinc-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* PRICE */}
            <p className="mt-5 text-3xl font-bold text-orange-600">
              ₦{product.price.toLocaleString()}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-zinc-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition"
                >
                  −
                </button>

                <span className="px-6 py-2 font-semibold text-zinc-800 min-w-12 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 transition"
                >
                  +
                </button>
              </div>

              <span className="text-sm text-zinc-500">
                {quantity > 1 ? `(${quantity} items)` : "(In Stock)"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddCart}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition font-medium"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 px-6 py-3 border border-zinc-300 rounded-xl hover:bg-zinc-100 transition font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaTruck className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-700">
                    Free Shipping
                  </p>
                  <p className="text-xs text-zinc-500">
                    On orders above ₦5,000
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaUndo className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-700">
                    Easy Returns
                  </p>
                  <p className="text-xs text-zinc-500">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaLock className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-700">
                    Secure Checkout
                  </p>
                  <p className="text-xs text-zinc-500">100% secure payment</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaBox className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-700">
                    Fast Delivery
                  </p>
                  <p className="text-xs text-zinc-500">2-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="p-6 border-t border-zinc-200 bg-zinc-50">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">
            Customers Also Viewed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => {
              const isWishlisted = wishlistItems.some(
                (item) => item.productId === p.id,
              );

              return (
                <div key={p.id} className="relative group">
                  <button
                    onClick={() => {
                      if (isWishlisted) {
                        dispatch(removeFromWishlist(p.id));
                        toast.info("Removed from wishlist");
                      } else {
                        dispatch(addToWishlist(p));
                        toast.success("Added to wishlist");
                      }
                    }}
                    className="absolute top-3 right-3 outline-none cursor-pointer z-10 bg-white/90 p-2 rounded-full shadow text-red-500 hover:scale-110 transition"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-zinc-400" />
                    )}
                  </button>

                  <Link
                    to={`/product/${p.id}`}
                    className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer block"
                  >
                    <div className="overflow-hidden bg-zinc-100 h-40">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-zinc-800 text-sm mb-2 line-clamp-2">
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(Math.floor(p.rating))].map((_, i) => (
                          <FaStar key={i} className="text-orange-500 text-xs" />
                        ))}
                        <span className="text-xs text-zinc-500 ml-1">
                          ({p.reviews})
                        </span>
                      </div>

                      <p className="text-lg font-bold text-orange-600">
                        ₦{p.price}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
