import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = e.currentTarget;

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setSuccess("Email sent successfully!");

      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);

      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendEmail}
      className="min-h-[70vh] w-full flex items-center justify-center px-6 py-20 md:px-16"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Contact
          </p>

          <h2 className="text-3xl font-light tracking-[0.08em] md:text-4xl">
            Get in touch
          </h2>

          <p className="mt-5 text-sm leading-6 text-neutral-600">
            Have a question? Send us a message and we’ll get back to you.
          </p>
        </div>

        <div className="mb-8">
          <label
            htmlFor="name"
            className="mb-3 block text-[11px] uppercase tracking-[0.2em]"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="email"
            className="mb-3 block text-[11px] uppercase tracking-[0.2em]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
          />
        </div>

        <div className="mb-10">
          <label
            htmlFor="message"
            className="mb-3 block text-[11px] uppercase tracking-[0.2em]"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            rows="3"
            required
            className="w-full resize-none border-0 border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="min-w-[180px] border border-black bg-black px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

        {success && (
          <p className="mt-6 text-center text-sm text-green-700">{success}</p>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}
