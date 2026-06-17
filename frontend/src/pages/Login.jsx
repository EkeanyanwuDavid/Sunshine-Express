import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSun,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-lg shrink-0" />
          <span>{message || "Login failed. Please try again."}</span>
        </div>,
      );
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Logging in", form);

    const found = validate();

    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const userData = {
      email: form.email,
      password: form.password,
    };

    try {
      await dispatch(login(userData)).unwrap();

      console.log("Login success");
      toast.success(
        <div className="flex items-center gap-2">
          <FaSun className="text-orange-600 text-lg" />
          <span>Welcome back! Redirecting...</span>
        </div>,
      );
      navigate("/");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
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

            <h1 className="mt-5 text-2xl font-bold text-zinc-900 tracking-tight">
              Welcome back
            </h1>

            <p className="mt-1 font-body text-sm text-zinc-500">
              Log in to continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaEnvelope className="text-xs" />
                </span>

                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={`w-full font-body pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${
                    errors.email ? "border-red-400" : "border-zinc-200"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-body text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaLock className="text-xs" />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className={`w-full font-body pl-9 pr-10 py-2.5 text-sm rounded-lg border bg-zinc-50 text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-150 focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 ${
                    errors.password ? "border-red-400" : "border-zinc-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* REMEMBER ME */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-zinc-300 accent-orange-700 cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-sm font-body text-zinc-500 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-all duration-150 mt-2"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-zinc-800 hover:underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
