import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";

import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          username: username.trim(),
          password: password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      login(data);

      navigate("/home");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light tracking-wide text-neutral-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Sign in to your account
            </p>
          </div>

          <div className="bg-white border border-neutral-200 p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] mb-2 text-neutral-600">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full border-b border-neutral-300 py-3 text-sm outline-none focus:border-black transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] mb-2 text-neutral-600">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full border-b border-neutral-300 py-3 text-sm outline-none focus:border-black transition"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
              <p className="text-sm text-neutral-500">Don't have an account?</p>

              <Link
                to="/register"
                className="inline-block mt-2 text-sm underline underline-offset-4"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
