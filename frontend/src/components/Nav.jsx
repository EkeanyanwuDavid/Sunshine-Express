import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../features/auth/authService";
import { logout } from "../features/auth/authSlice";
import {
  FaSignInAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Features", "Pricing", "About", "Contact"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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
              <button
                onClick={() => {
                  authService.logout();
                  dispatch(logout());
                  navigate("/login");
                }}
                className="px-4 py-2 text-sm font-semibold text-orange-600 border border-orange-200 bg-white hover:bg-orange-50 rounded-md transition-all duration-150 flex items-center gap-2"
              >
                <FaSignOutAlt className="text-[14px]" /> Logout
              </button>
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
                    authService.logout();
                    dispatch(logout());
                    navigate("/login");
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

      <div className="h-16"></div>
    </>
  );
}
export default Nav;
