import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-8 text-neutral-300"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 className="mb-3 font-serif text-2xl font-light text-neutral-900">
            Your bag is empty
          </h2>
          <p className="mb-10 max-w-xs text-sm leading-7 text-neutral-500">
            Discover our collections and add your favourites.
          </p>
          <Link
            to="/shop"
            className="border border-black bg-black px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800"
          >
            Explore Collections
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="border-b border-neutral-200 px-6 py-10 text-center md:px-16">
        <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
          Shopping
        </p>
        <h1 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
          Your Bag
        </h1>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 hidden grid-cols-[1fr_120px_100px_40px] gap-4 border-b border-neutral-200 pb-3 text-[10px] uppercase tracking-[0.18em] text-neutral-400 md:grid">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            <ul className="flex flex-col divide-y divide-neutral-200">
              {items.map((item) => {
                const numericPrice = parseFloat(
                  String(item.price).replace(/[^0-9.]/g, ""),
                );
                const lineTotal = isNaN(numericPrice)
                  ? item.price
                  : `$${(numericPrice * item.qty).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`;

                return (
                  <li
                    key={item.id}
                    className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr_120px_100px_40px] md:gap-6 md:items-center"
                  >
                    <Link
                      to="/product"
                      state={{
                        product: item,
                        backPath: "/cart",
                        backLabel: "Bag",
                      }}
                      className="block flex-shrink-0"
                    >
                      <div className="overflow-hidden bg-neutral-100">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-[180px] w-full object-cover transition duration-300 hover:scale-105 sm:h-[200px] md:h-[180px]"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-base font-light leading-snug text-neutral-900">
                        {item.name}
                      </h3>
                      {item.color && (
                        <p className="text-[12px] text-neutral-500">
                          Colour: {item.color}
                        </p>
                      )}
                      {item.size && (
                        <p className="text-[12px] text-neutral-500">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="mt-1 text-[13px] font-light text-neutral-700">
                        {item.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-start md:justify-center">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="flex h-9 w-9 items-center justify-center text-base text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="flex h-9 min-w-[36px] items-center justify-center border-x border-neutral-300 text-[13px] tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center text-base text-neutral-600 transition hover:bg-neutral-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="text-right text-[13px] font-light text-neutral-800 tabular-nums">
                      {lineTotal}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-8 w-8 items-center justify-center self-start text-neutral-300 transition-colors hover:text-black md:self-auto"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <Link
                to="/shop"
                className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 underline underline-offset-4 transition-colors hover:text-black"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-neutral-50 px-7 py-8">
              <h2 className="mb-6 font-serif text-lg font-light tracking-wide">
                Order Summary
              </h2>
              <ul className="flex flex-col gap-3 text-[13px] text-neutral-600">
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
                    <li
                      key={item.id}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="flex-1 leading-snug">
                        {item.name}
                        {item.qty > 1 && (
                          <em className="ml-1 not-italic opacity-60">
                            × {item.qty}
                          </em>
                        )}
                      </span>
                      <span className="flex-shrink-0 tabular-nums">{line}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="my-5 h-px bg-neutral-200" />
              <div className="flex items-baseline justify-between text-[14px] text-neutral-800">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[12px] text-neutral-500">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>

              <div className="my-5 h-px bg-neutral-200" />

              <div className="flex items-baseline justify-between text-[15px] font-semibold text-neutral-900">
                <span>Total</span>
                <span className="tabular-nums">
                  $
                  {totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-neutral-400">
                Taxes and import duties calculated at checkout. Complimentary
                delivery on all orders.
              </p>

              <Link
                to="/checkout"
                className="mt-6 block w-full bg-black py-4 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 flex flex-col gap-2">
                {[
                  "Secure checkout",
                  "Free returns within 30 days",
                  "Complimentary gift wrapping",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-[11px] text-neutral-500"
                  >
                    <span className="text-black">◇</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
