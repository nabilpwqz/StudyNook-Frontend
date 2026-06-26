import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("googleSuccess")) {
      toast.success("Google login successful!");
      refreshUser().then(() => navigate("/"));
    }

    if (params.get("googleError")) {
      toast.error("Google login failed. Please try again.");
    }
  }, [location.search, navigate, refreshUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await login(formData);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
  const googleLoginUrl = `${backendUrl}/api/auth/google?redirect_uri=${encodeURIComponent(window.location.origin)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">SN StudyNook</h1>
        <p className="text-center text-primary/80 mb-8">Sign in to your SN StudyNook account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4">
          <a
            href={googleLoginUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
          >
            Continue with Google
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-dark">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
