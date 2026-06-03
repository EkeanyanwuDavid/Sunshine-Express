import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../features/auth/authService";
import { logout } from "../features/auth/authSlice";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreasedQty,
} from "../features/cart/cartSlice";
import {
  FaSignInAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSun,
  FaSignOutAlt,
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);
  const navLinks = ["Features", "Pricing", "About", "Contact"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/login");
  };
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm " : "bg-white"}`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="font-bold text-xl flex items-center gap-1.5 tracking-tight">
              <FaSun className="text-2xl text-orange-500 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
              <span className="text-amber-600">Sunshine</span>

              <span className="text-zinc-800">Express</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link}>
                <Link className="px-3.5 py-2 font-body text-sm text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-50 transition-all duration-150 font-medium">
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <div className=" hidden md:flex items-center gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-all duration-150"
                >
                  <FaSignInAlt className="text-[13px]" /> Log in
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-all duration-150"
                >
                  <FaUser className="text-[13px]" /> Sign up
                </Link>
              </>
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={() => setCartOpen(!cartOpen)}
                    className="relative flex items-center justify-center w-10 h-10 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-full transition-all duration-150"
                  >
                    <FaShoppingCart className="text-lg" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>

                  {cartOpen && (
                    <div
                      ref={cartRef}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-zinc-200 z-40"
                    >
                      <div className="p-4 border-b border-zinc-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-zinc-800">
                          Shopping Cart
                        </h3>
                        <button
                          onClick={() => setCartOpen(false)}
                          className="text-zinc-500 hover:text-zinc-700"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.length === 0 ? (
                          <div className="p-4 text-center text-zinc-500 text-sm">
                            Your cart is empty
                          </div>
                        ) : (
                          cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 border-b border-zinc-100 flex justify-between items-start gap-3"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-zinc-800">
                                  {item.name}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() =>
                                      dispatch(decreasedQty(item.id))
                                    }
                                    className="p-1 text-xs bg-zinc-200 text-zinc-700 rounded hover:bg-zinc-300 transition"
                                  >
                                    <FaMinus />
                                  </button>
                                  <span className="text-xs font-semibold text-zinc-700 w-6 text-center">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() =>
                                      dispatch(increaseQty(item.id))
                                    }
                                    className="p-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                                <p className="text-sm font-bold text-orange-600 mt-2">
                                  ₦{(item.price || 0).toLocaleString()}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {cartItems.length > 0 && (
                        <div className="p-4 border-t border-zinc-100">
                          <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-100">
                            <span className="text-sm font-medium text-zinc-600">
                              Total:
                            </span>

                            <span className="text-lg font-bold text-orange-600">
                              ₦
                              {cartItems
                                .reduce((total, item) => {
                                  const price = Number(item.price) || 0;
                                  const qty = item.qty || 1;

                                  return total + price * qty;
                                }, 0)
                                .toLocaleString()}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                dispatch(clearCart());
                                setCartOpen(false);
                              }}
                              className="flex-1 px-3 py-2 text-xs bg-zinc-200 text-zinc-700 rounded hover:bg-zinc-300 transition"
                            >
                              Clear Cart
                            </button>

                            <button
                              disabled={!cartItems.length}
                              onClick={() => navigate("/checkout")}
                              className={`px-3 py-2 text-xs rounded flex-1 text-white transition ${
                                cartItems.length
                                  ? "bg-orange-600 hover:bg-orange-700"
                                  : "bg-zinc-300 cursor-not-allowed"
                              }`}
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-4 py-2 text-sm font-semibold text-orange-600 border border-orange-200 bg-white hover:bg-orange-50 rounded-md transition-all duration-150 flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-[14px]" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Burger Menu */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden justify-center text-zinc-700 hover:bg-zinc-100 rounded-md transition-all duration-150"
          >
            {menuOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </nav>

        {/* mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-5 pt-1 border-t border-zinc-100 bg-white">
            <ul className="flex flex-col gap-0.5 mb-4">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    className="block px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-all duration-150 font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 border border-zinc-200 transition-all duration-150"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-[13px]" /> Log in
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-zinc-700 transition-all duration-150"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="text-[13px]" /> Sign up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-all duration-150"
                >
                  <FaSignOutAlt className="text-[14px]" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-lg" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900">
                Confirm Logout
              </h2>
            </div>

            <p className="text-zinc-600 text-sm mb-6">
              Are you sure you want to logout? You'll need to sign in again to
              continue shopping.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <FaSignOutAlt className="text-sm" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-16"></div>
    </>
  );
}
export default Nav;
