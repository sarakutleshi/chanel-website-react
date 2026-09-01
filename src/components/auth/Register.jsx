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
      /*
       * DummyJSON doesn't provide real persistent
       * registration authentication.
       *
       * For frontend testing, we store the
       * registration data locally.
       */

      const user = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        username: form.username,
      };

      localStorage.setItem("registeredUser", JSON.stringify(user));

      /*
       * Send welcome email with EmailJS
       */

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
      <div className="min-h-screen flex items-center justify-center  px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light tracking-wide">
              Create Account
            </h1>

            <p className="mt-3 text-sm text-neutral-500">Create your account</p>
          </div>

          <div className="bg-white border border-neutral-200 p-8">
            <form onSubmit={handleRegister} className="space-y-5">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border-b border-neutral-300 py-3 outline-none focus:border-black"
              />

              {error && (
                <div className="bg-red-50 text-red-600 p-3 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-700 p-3 text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm text-neutral-500">
                Already have an account?
              </p>

              <Link
                to="/signin"
                className="inline-block mt-2 text-sm underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
