import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const user = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        username: form.username,
      };

      localStorage.setItem("registeredUser", JSON.stringify(user));

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          username: form.username,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setSuccess(
        "Account created successfully! A welcome email has been sent.",
      );

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      console.error(err);

      setError("Registration completed, but the email could not be sent.");
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
              <div className="mb-5 text-center">
                <p className="mb-3 text-[8px] uppercase tracking-[0.3em] text-neutral-400">
                  My Account
                </p>

                <h1 className="text-[28px] font-light tracking-[-0.02em] md:text-[32px]">
                  Create Account
                </h1>

                <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                  Create your account
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-1">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Username
                    </label>

                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-[8px] uppercase tracking-[0.22em] text-neutral-500"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-[13px] outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-neutral-900"
                    />
                  </div>

                  {error && (
                    <div className="border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] leading-4 text-red-600">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="border border-green-200 bg-green-50 px-3 py-2.5 text-[11px] leading-4 text-green-700">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black py-3.5 text-[9px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </form>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-5 text-center">
                <p className="text-[11px] text-neutral-500">
                  Already have an account?
                </p>

                <Link
                  to="/signin"
                  className="mt-2 inline-block border-b border-neutral-900 pb-0.5 text-[9px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
                >
                  Sign In
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
