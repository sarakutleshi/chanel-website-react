import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  function handleFinalizeOrder() {
    setOrdered(true);
    clearCart();
  }

  if (ordered) {
    return (
      <>
        <Navbar />
        <div className="flex text-center justify-center p-[4rem_var(--page-padding)] min-h-[70vh] mb-5">
          <div className="text-center max-w-[520px]">
            <div className="w-16 h-16 rounded-full bg-[var(--ink)] text-[var(--white)] text-[1.6rem] flex items-center justify-center mx-auto mb-8 mt-[5rem]">
              ✓
            </div>
            <span className="eyebrow-label">Order Confirmed</span>
            <h1 className="font-[var(--serif)] text-[clamp(1.5rem,3vw,2.2rem)] font-normal leading-[1.25] mt-2 mb-5 text-[var(--ink)]">
              Thank you for your order
            </h1>
            <p className="text-[0.9rem] text-[var(--ink)] mb-8 ">
              Your CHANEL order has been received. A confirmation will be sent
              to your email shortly. Our team will contact you within 24 hours
              to arrange delivery.
            </p>
            <Link
              to="/"
              className="inline-block px-10 py-[0.9rem] text-[var(--white)] bg-[var(--ink)] font-sans text-[0.68rem] font-medium tracking-[0.14em] uppercase no-underline transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex text-center justify-center px-[4rem] py-[var(--pad)] min-h-[70vh]">
          <div className="text-center max-w-[380px]">
            <svg
              className="text-[var(--ink)] mx-auto mb-[2rem] "
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2 className="font-serif text-[1.5rem] font-medium mb-[0.75rem] text-[var(--ink)]">
              Your cart is empty
            </h2>
            <p className="text-[0.88rem] text-[var(--muted)] mb-[2.5rem] ">
              Discover our collections and add your favourites.
            </p>
            <Link
              to="/"
              className="inline-block px-[0.9rem] py-[1.5rem] bg-[var(--ink)] text-[var(--white)] font-sans text-[0.68rem] font-medium tracking-[0.14em] uppercase no-underline transition-colors duration-200"
            >
              Explore Collections
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[60vh]">
        <div className="section-label">
          <h2>Your Selection</h2>
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-[5rem] px-[var(--pad)] py-[7rem] text-start">
   <div className="flex flex-col gap-0">
  {items.map((item) => (
    <article
      key={item.id}
      className="relative grid grid-cols-1 gap-6 border-b border-[var(--rule)] px-4 py-6 sm:grid-cols-[160px_1fr] sm:gap-8 sm:px-8 lg:grid-cols-[220px_1fr] lg:gap-12 lg:px-8"
    >
      <Link
        to="/product"
        state={{
          product: item,
          backPath: "/cart",
          backLabel: "Cart",
        }}
        className="block"
      >
        <div className="overflow-hidden bg-[var(--off)]">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-[220px] sm:h-[240px] lg:h-[300px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-[0.3rem] pt-[0.25rem]">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {item.category}
        </span>

        <h3 className="font-serif text-[1rem] leading-[1.3] font-normal text-[var(--ink)] sm:text-[1.1rem]">
          {item.name}
        </h3>

        <span className="mt-[0.25rem] text-[0.9rem] font-normal text-[var(--ink)]">
          {item.price}
        </span>

        <div className="mt-4 flex w-fit items-center border border-[var(--rule)]">
          <button
            className="flex h-[34px] w-[34px] items-center justify-center bg-transparent text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--off)]"
            onClick={() => updateQty(item.id, item.qty - 1)}
            disabled={item.qty <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="flex h-[34px] min-w-[40px] items-center justify-center border-x border-[var(--rule)] text-[0.85rem] text-[var(--ink)]">
            {item.qty}
          </span>

          <button
            className="flex h-[34px] w-[34px] items-center justify-center bg-transparent text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--off)]"
            onClick={() => updateQty(item.id, item.qty + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-[var(--ink)] text-[var(--white)] text-lg transition-colors duration-200 hover:opacity-90"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        ×
      </button>
    </article>
  ))}
</div>

          <aside className="sticky top-20 h-fit top-[84px] bg-[var(--off)] px-[2.5rem] py-[2rem] flex flex-col">
            <h2 className="font-serif text-[1rem] font-400 bg-[var(--off)] teacking-[0.18rem] mb-[1.75rem]">
              Order Summary
            </h2>

            <div className="flex justify-between flex-col items-baseline gap-[1rem] text-[0.82rem] text-[var(--muted)] ">
              {items.map((item) => {
                const numeric = parseFloat(
                  String(item.price).replace(/[^0-9.]/g, ""),
                );
                const line = isNaN(numeric)
                  ? item.price
                  : `$${(numeric * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                return (
                  <div
                    className="flex justify-between items-baseline gap-[1rem] text-[0.82rem] text-[var(--muted)] "
                    key={item.id}
                  >
                    <span className="flex-1 leading-[1.4]">
                      {item.name}
                      {item.qty > 1 && (
                        <em className="opacity-[0.75] text-[var(--muted)]">
                          {" "}
                          × {item.qty}
                        </em>
                      )}
                    </span>
                    <span className="font-light tabular-nums whitespace-nowrap flex-shrink-0">
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-[1px] bg-[var(--rule)] my-[1rem] mx-[0]" />

            <div className="flex justify-between items-baseline  text-[0.9rem] text-[var(--ink)] font-semibold mb-[1rem]">
              <span>Total</span>
              <span>
                $
                {totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="text-[0.72rem] text-[var(--muted)] mb-[2rem] leading-[1.4]">
              Taxes and shipping calculated at checkout. Complimentary delivery
              on all orders.
            </div>

            <button
              className="w-full p-[1.1rem] bg-[var(--ink)] text-[var(--white)] font-sans text-[0.68rem] font-medium tracking-[0.14em]
             uppercase no-underline transition-colors duration-200 mb-[1rem]"
              onClick={handleFinalizeOrder}
            >
              Finalise Order
            </button>

            <Link
              to="/"
              className="text-center text-[0.68rem] font-medium tracking-[0.12rem] uppercase text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--ink)]"
            >
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
