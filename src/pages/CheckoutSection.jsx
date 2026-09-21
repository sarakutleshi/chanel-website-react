import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const STEPS = ["Delivery", "Payment", "Review"];

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  half,
}) {
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600"
      >
        {label}
        {required && <span className="ml-0.5 text-neutral-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
      />
    </div>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium transition-colors ${
                  done
                    ? "bg-black text-white"
                    : active
                      ? "border-2 border-black bg-white text-black"
                      : "border border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] uppercase tracking-[0.14em] ${
                  active ? "font-semibold text-black" : "text-neutral-400"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-4 mb-5 h-px w-16 transition-colors ${
                  done ? "bg-black" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderConfirmed({ orderRef }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
        ✓
      </div>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-neutral-600">
        Order Confirmed
      </p>
      <h2 className="mb-5 font-serif text-3xl font-light">
        Thank you for your order
      </h2>
      <p className="mb-2 text-sm text-neutral-500">
        Reference:{" "}
        <span className="font-medium tracking-[0.1em] text-neutral-800">
          {orderRef}
        </span>
      </p>
      <p className="mb-10 max-w-md text-sm leading-7 text-neutral-500">
        Your CHANEL order has been received. A confirmation will be sent to your
        email shortly. Our team will contact you within 24 hours to arrange
        delivery.
      </p>
      <Link
        to="/shop"
        className="border border-black bg-black px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [orderRef] = useState(
    () => "CHN-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  );

  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    country: "France",
    postalCode: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [deliveryErrors, setDeliveryErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  if (items.length === 0 && !confirmed) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-sm text-neutral-500">Your bag is empty.</p>
          <Link
            to="/shop"
            className="border border-black px-8 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-black hover:text-white transition-colors"
          >
            Back to Shop
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  function setDeliveryField(field) {
    return (e) => setDelivery((prev) => ({ ...prev, [field]: e.target.value }));
  }
  function setPaymentField(field) {
    return (e) => setPayment((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleCardNumber(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setPayment((prev) => ({ ...prev, cardNumber: formatted }));
  }

  function handleExpiry(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw;
    setPayment((prev) => ({ ...prev, expiry: formatted }));
  }

  function validateDelivery() {
    const errs = {};
    if (!delivery.firstName.trim()) errs.firstName = "Required";
    if (!delivery.lastName.trim()) errs.lastName = "Required";
    if (!delivery.email.trim() || !/\S+@\S+\.\S+/.test(delivery.email))
      errs.email = "Valid email required";
    if (!delivery.address.trim()) errs.address = "Required";
    if (!delivery.city.trim()) errs.city = "Required";
    if (!delivery.postalCode.trim()) errs.postalCode = "Required";
    setDeliveryErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validatePayment() {
    const errs = {};
    if (!payment.cardName.trim()) errs.cardName = "Required";
    const digits = payment.cardNumber.replace(/\s/g, "");
    if (digits.length < 16)
      errs.cardNumber = "Enter a valid 16-digit card number";
    if (!payment.expiry || payment.expiry.length < 5) errs.expiry = "Required";
    if (!payment.cvv || payment.cvv.length < 3) errs.cvv = "Required";
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleNextStep() {
    if (step === 0 && !validateDelivery()) return;
    if (step === 1 && !validatePayment()) return;
    if (step === 2) {
      if (placing) return;
      setPlacing(true);
      setEmailError("");

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setEmailError(
          "Email is not configured. Please contact support.",
        );
        setPlacing(false);
        return;
      }

      const formatMoney = (n) =>
        Number(n).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      const orders = items.map((item) => {
        const unit = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
        const lineTotal = isNaN(unit) ? 0 : unit * item.qty;
        const imageUrl = String(item.img || "");
        return {
          name: item.name,
          units: item.qty,
          price: formatMoney(lineTotal),
          image_url: imageUrl.startsWith("http") ? imageUrl : "",
        };
      });

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            email: delivery.email,
            to_email: delivery.email,
            to_name: `${delivery.firstName} ${delivery.lastName}`,
            order_id: orderRef,
            orders,
            cost: {
              shipping: "0.00",
              tax: "0.00",
              total: formatMoney(totalPrice),
            },
          },
          { publicKey },
        );

        clearCart();
        setConfirmed(true);
      } catch (err) {
        console.error("EmailJS failed:", err);
        const message =
          err?.text ||
          err?.message ||
          (typeof err === "string" ? err : "Could not send confirmation email.");
        setEmailError(String(message));
      } finally {
        setPlacing(false);
      }
      return;
    }
    setStep((s) => s + 1);
  }

  if (confirmed) {
    return (
      <>
        <Navbar />
        <OrderConfirmed orderRef={orderRef} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="border-b border-neutral-200 px-6 py-10 text-center md:px-16">
        <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
          CHANEL
        </p>
        <h1 className="mb-8 font-serif text-3xl font-light md:text-4xl">
          Checkout
        </h1>
        <StepIndicator current={step} />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            {step === 0 && (
              <section>
                <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <Field
                    label="First Name"
                    id="firstName"
                    placeholder="Gabrielle"
                    value={delivery.firstName}
                    onChange={setDeliveryField("firstName")}
                    required
                    half
                  />
                  <Field
                    label="Last Name"
                    id="lastName"
                    placeholder="Chanel"
                    value={delivery.lastName}
                    onChange={setDeliveryField("lastName")}
                    required
                    half
                  />
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="gabrielle@chanel.com"
                    value={delivery.email}
                    onChange={setDeliveryField("email")}
                    required
                  />
                  <Field
                    label="Phone"
                    id="phone"
                    type="tel"
                    placeholder="+33 1 00 00 00 00"
                    value={delivery.phone}
                    onChange={setDeliveryField("phone")}
                    half
                  />
                  <Field
                    label="Address"
                    id="address"
                    placeholder="31 Rue Cambon"
                    value={delivery.address}
                    onChange={setDeliveryField("address")}
                    required
                  />
                  <Field
                    label="Apartment / Suite"
                    id="apartment"
                    placeholder="Optional"
                    value={delivery.apartment}
                    onChange={setDeliveryField("apartment")}
                  />
                  <Field
                    label="City"
                    id="city"
                    placeholder="Paris"
                    value={delivery.city}
                    onChange={setDeliveryField("city")}
                    required
                    half
                  />
                  <Field
                    label="Postal Code"
                    id="postalCode"
                    placeholder="75001"
                    value={delivery.postalCode}
                    onChange={setDeliveryField("postalCode")}
                    required
                    half
                  />
                  <div className="col-span-2">
                    <label
                      htmlFor="country"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      value={delivery.country}
                      onChange={setDeliveryField("country")}
                      className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none focus:border-black"
                    >
                      {[
                        "France",
                        "Albania",
                        "Kosova",
                        "United Kingdom",
                        "United States",
                        "Germany",
                        "Italy",
                        "Japan",
                        "UAE",
                        "Other",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {Object.keys(deliveryErrors).length > 0 && (
                  <p className="mt-6 text-[12px] text-red-500">
                    Please fill in all required fields.
                  </p>
                )}
              </section>
            )}

            {step === 1 && (
              <section>
                <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                  Payment Details
                </h2>

                <div className="mb-8 flex items-center gap-3">
                  {["VISA", "MC", "AMEX"].map((brand) => (
                    <span
                      key={brand}
                      className="rounded border border-neutral-200 px-2.5 py-1 text-[10px] font-bold tracking-wider text-neutral-500"
                    >
                      {brand}
                    </span>
                  ))}
                  <span className="text-[11px] text-neutral-400">
                    · Secure 256-bit SSL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <div className="col-span-2">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      placeholder="Gabrielle Chanel"
                      value={payment.cardName}
                      onChange={setPaymentField("cardName")}
                      className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                    />
                    {paymentErrors.cardName && (
                      <p className="mt-1 text-[11px] text-red-500">
                        {paymentErrors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={payment.cardNumber}
                      onChange={handleCardNumber}
                      maxLength={19}
                      className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                    />
                    {paymentErrors.cardNumber && (
                      <p className="mt-1 text-[11px] text-red-500">
                        {paymentErrors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={handleExpiry}
                      maxLength={5}
                      className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                    />
                    {paymentErrors.expiry && (
                      <p className="mt-1 text-[11px] text-red-500">
                        {paymentErrors.expiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      CVV *
                    </label>
                    <input
                      type="text"
                      placeholder="•••"
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment((prev) => ({
                          ...prev,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                        }))
                      }
                      maxLength={4}
                      className="w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
                    />
                    {paymentErrors.cvv && (
                      <p className="mt-1 text-[11px] text-red-500">
                        {paymentErrors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-8 text-[11px] leading-5 text-neutral-400">
                  Your payment information is encrypted and never stored on our
                  servers.
                </p>
              </section>
            )}

            {step === 2 && (
              <section>
                <h2 className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                  Review Your Order
                </h2>

                <div className="mb-8 border border-neutral-200 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                      Delivery
                    </h3>
                    <button
                      onClick={() => setStep(0)}
                      className="text-[11px] uppercase tracking-[0.12em] text-neutral-400 underline underline-offset-4 hover:text-black"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[13px] leading-6 text-neutral-600">
                    {delivery.firstName} {delivery.lastName}
                    <br />
                    {delivery.address}
                    {delivery.apartment ? `, ${delivery.apartment}` : ""}
                    <br />
                    {delivery.city}, {delivery.postalCode}
                    <br />
                    {delivery.country}
                    <br />
                    {delivery.email}
                  </p>
                </div>

                <div className="mb-8 border border-neutral-200 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                      Payment
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-[11px] uppercase tracking-[0.12em] text-neutral-400 underline underline-offset-4 hover:text-black"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[13px] text-neutral-600">
                    {payment.cardName}
                    <br />
                    •••• •••• ••••{" "}
                    {payment.cardNumber.replace(/\s/g, "").slice(-4)}
                  </p>
                </div>

                <div className="border border-neutral-200 p-6">
                  <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                    Items ({items.length})
                  </h3>
                  <ul className="flex flex-col gap-5">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-16 w-16 flex-shrink-0 object-cover bg-neutral-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-[13px] font-medium text-neutral-800">
                            {item.name}
                          </p>
                          {item.color && (
                            <p className="text-[11px] text-neutral-400">
                              {item.color}
                              {item.size ? ` · ${item.size}` : ""}
                            </p>
                          )}
                          <p className="text-[12px] text-neutral-500">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <p className="text-[13px] text-neutral-700 tabular-nums">
                          {item.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-[11px] leading-6 text-neutral-400">
                  By placing your order, you agree to CHANEL&apos;s terms and
                  conditions and privacy policy.
                </p>
              </section>
            )}

            <div className="mt-10 flex flex-col gap-4">
              {emailError && (
                <p className="text-[12px] leading-5 text-red-600">
                  Email failed: {emailError}
                </p>
              )}
              <div className="flex items-center gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  disabled={placing}
                  className="border border-neutral-300 px-8 py-4 text-[11px] uppercase tracking-[0.16em] text-neutral-600 transition-colors hover:border-black hover:text-black disabled:opacity-50"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                disabled={placing}
                className="flex-1 bg-black py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placing
                  ? "Placing Order…"
                  : step === 2
                    ? "Place Order"
                    : "Continue →"}
              </button>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-neutral-50 px-7 py-8">
              <h2 className="mb-6 font-serif text-lg font-light">
                Order Summary
              </h2>

              <ul className="flex flex-col gap-4">
                {items.map((item) => {
                  const numeric = parseFloat(
                    String(item.price).replace(/[^0-9.]/g, ""),
                  );
                  const line = isNaN(numeric)
                    ? item.price
                    : `$${(numeric * item.qty).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`;

                  return (
                    <li key={item.id} className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-14 w-14 object-cover bg-neutral-200"
                        />
                        {item.qty > 1 && (
                          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[9px] text-white">
                            {item.qty}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[12px] font-medium text-neutral-800">
                          {item.name}
                        </p>
                        {item.size && (
                          <p className="text-[10px] text-neutral-400">
                            {item.size}
                          </p>
                        )}
                      </div>
                      <p className="text-[12px] text-neutral-700 tabular-nums">
                        {line}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="my-5 h-px bg-neutral-200" />

              <div className="flex justify-between text-[13px] text-neutral-600">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-[12px] text-neutral-400">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>

              <div className="my-4 h-px bg-neutral-200" />

              <div className="flex justify-between text-[15px] font-semibold text-neutral-900">
                <span>Total</span>
                <span className="tabular-nums">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
