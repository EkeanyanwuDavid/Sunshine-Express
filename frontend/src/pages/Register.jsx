import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaSun,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Register() {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-lg shrink-0" />
          <span>{message || "Registration failed. Please try again."}</span>
        </div>,
      );
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isSuccess, navigate, dispatch]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "At least 8 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register submit", form);

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const userData = {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    try {
      await dispatch(register(userData)).unwrap();
      console.log("Register success");
      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-lg shrink-0" />
          <span>Account created! Redirecting...</span>
        </div>,
      );
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Register failed", error);
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-lg shrink-0" />
          <span>{error?.message || "Registration failed"}</span>
        </div>,
      );
    }
  };

  if (isLoading) {
    return <Spinner message="Creating your account..." />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 select-none">
              <span className="font-bold text-xl flex items-center gap-1.5 tracking-tight">
                <FaSun className="text-2xl text-orange-500 drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]" />
                <span className="text-amber-600">Sunshine</span>

                <span className="text-zinc-800">Express</span>
              </span>
            </Link>
            <h1 className="mt-5 text-2xl font-bold text-zinc-800 tracking-tight">
              Create your account
            </h1>
            <p className="mt-1 text-sm font-body text-zinc-500">
              Join thousand of shoppers today
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaUser className="text-xs" />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={`w-full font-body pl-9 py-2.5 pr-4 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${errors.fullName ? "border-red-400" : "border-zinc-200"}`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaEnvelope className="text-xs" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Jane@example.com"
                  className={`w-full font-body pl-9 py-2.5 pr-4 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${errors.email ? "border-red-400" : "border-zinc-200"}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Phone Number
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaPhone className="text-xs" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 000"
                  className={`w-full font-body pl-9 py-2.5 pr-4 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${errors.phone ? "border-red-400" : "border-zinc-200"}`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaLock className="text-xs" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`w-full font-body pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${errors.password ? "border-red-400" : "border-zinc-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xs" />
                  ) : (
                    <FaEye className="text-xs" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaLock className="text-xs" />
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`w-full font-body pr-4 pl-9 py-2.5 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${errors.confirmPassword ? "border-red-400" : "border-zinc-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setshowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showConfirm ? (
                    <FaEyeSlash className="text-xs" />
                  ) : (
                    <FaEye className="text-xs" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <p className="text-xs font-body text-zinc-400 leading-relaxed">
              By creating an account you agree to our{" "}
              <a
                href="#"
                className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900"
              >
                Privacy Policy
              </a>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition-all duration-150 mt-2 ${isLoading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 font-body text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-zinc-900 hover:underline underline-offset-2"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
