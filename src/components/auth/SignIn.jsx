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

      <div className="min-h-screen bg-white text-neutral-900">
        <main className="min-h-[calc(100vh-68px)]">
          <section className="mx-auto flex min-h-[calc(100vh-68px)] max-w-[1500px] items-center justify-center px-5 py-12 md:px-8 lg:px-12">
            <div className="w-full max-w-[360px]">
              <div className="mb-2 text-center">
                <p className="mb-3 text-[8px] uppercase tracking-[0.3em] text-neutral-400">
                  My Account
                </p>

                <h1 className="text-[28px] font-light tracking-[-0.02em] md:text-[32px]">
                  Welcome Back
                </h1>

                <p className="mx-auto mt-1 max-w-[270px] text-[11px] leading-5 text-neutral-500">
                  Sign in to access your account and saved pieces.
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-1">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="group">
                    <label
                      htmlFor="username"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Username
                    </label>

                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                      autoComplete="username"
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      autoComplete="current-password"
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  {error && (
                    <div className="border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] leading-4 text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center overflow-hidden bg-black py-3.5 text-[9px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{loading ? "Signing In..." : "Sign In"}</span>
                  </button>
                </form>
              </div>
              <div className="mt-8 border-t border-neutral-200 pt-5 text-center">
                <p className="text-[11px] text-neutral-500">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block border-b border-neutral-900 pb-0.5 text-[9px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
