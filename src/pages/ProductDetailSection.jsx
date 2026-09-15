import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const COLOR_HEX = {
  Black: "#1a1a1a",
  White: "#f5f5f5",
  Ivory: "#fffff0",
  Beige: "#d4c5a9",
  Camel: "#c19a6b",
  Navy: "#1b2a4a",
  Red: "#c0392b",
  Nude: "#e8c9a0",
  Plum: "#8e4585",
  Berry: "#7b2d8b",
  Rose: "#e8a0b0",
  Coral: "#e8806a",
  Tortoise: "#8b4513",
  Gold: "#d4a017",
  Silver: "#a8a9ad",
  "Rose Gold": "#b76e79",
  "White Gold": "#e8e8e8",
  Blush: "#f4c2c2",
  Poudre: "#e8d5c4",
  Orchid: "#c08cbf",
  Prune: "#6b3058",
  Or: "#d4a017",
  Bleu: "#2c5f8a",
};

const FEATURES = [
  "Complimentary shipping on all orders",
  "Gift wrapping available at checkout",
  "Returns within 30 days",
  "Exclusive CHANEL packaging",
];

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  if (!state?.product) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-32 text-center">
          <h2 className="mb-6 font-serif text-2xl font-light">Product not found.</h2>
          <Link
            to="/shop"
            className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 underline underline-offset-4 hover:text-black"
          >
            ← Return to Shop
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const { product, backPath, backLabel } = state;

  const name = product.name || product.title || "";
  const description = product.desc || product.description || "";
  const img = product.img || product.images?.[0] || "";
  const category = product.category || "";
  const subcategory = product.subcategory || "";
  const collection = product.collection || "";
  const colors = product.colors?.filter((c) => c !== "N/A") || [];
  const sizes = product.sizes || [];

  const rawPrice = product.price;
  const priceDisplay =
    rawPrice === 0 || rawPrice === "On request"
      ? "On request"
      : typeof rawPrice === "number"
      ? `$${rawPrice.toLocaleString()}`
      : rawPrice;

  function handleAddToCart() {
    let valid = true;

    if (colors.length > 0 && !selectedColor) {
      setColorError(true);
      valid = false;
    } else {
      setColorError(false);
    }

    if (sizes.length > 1 && !selectedSize) {
      setSizeError(true);
      valid = false;
    } else {
      setSizeError(false);
    }

    if (!valid) return;

    addToCart({
      id: `${product.id || name.toLowerCase().replace(/\s+/g, "-")}-${selectedColor || "default"}-${selectedSize || "default"}`,
      name,
      img,
      price: priceDisplay,
      category,
      desc: description,
      color: selectedColor,
      size: selectedSize,
      qty,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <>
      <Navbar />

      <nav className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 py-5 text-[11px] text-neutral-400 md:px-10">
        <button
          onClick={() => navigate(backPath || -1)}
          className="uppercase tracking-[0.12em] transition-colors hover:text-black"
        >
          ← {backLabel || "Back"}
        </button>
        <span>/</span>
        <span className="max-w-[30ch] truncate text-neutral-700">{name}</span>
      </nav>

     
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pb-24 pt-2 md:px-10 lg:grid-cols-2 lg:gap-20">
    
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="overflow-hidden bg-neutral-100">
            <img
              src={img}
              alt={name}
              className="h-[520px] w-full object-cover transition duration-700 hover:scale-[1.03] md:h-[640px]"
            />
          </div>
        </div>

        <div className="flex flex-col pt-2">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
            {subcategory && <span>{subcategory}</span>}
            {subcategory && collection && <span>·</span>}
            {collection && <span>{collection}</span>}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-light leading-snug text-neutral-900 md:text-4xl">
            {name}
          </h1>

          <p className="mt-4 font-serif text-2xl font-light text-neutral-900">
            {priceDisplay}
          </p>

          <div className="my-7 h-px bg-neutral-200" />

          <p className="text-[14px] leading-8 text-neutral-600">{description}</p>

          <div className="my-7 h-px bg-neutral-200" />

          {colors.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                  Colour
                </span>
                {selectedColor && (
                  <span className="text-[12px] text-neutral-500">{selectedColor}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setColorError(false); }}
                    title={color}
                    className={`h-8 w-8 rounded-full border-2 transition-all focus:outline-none ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-transparent hover:border-neutral-400"
                    }`}
                    style={{
                      backgroundColor: COLOR_HEX[color] || "#ccc",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.18)",
                    }}
                  />
                ))}
              </div>
              {colorError && (
                <p className="mt-2 text-[11px] text-red-500">Please select a colour.</p>
              )}
            </div>
          )}

          {sizes.length > 1 && (
            <div className="mb-6">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                  Size
                </span>
                {selectedSize && (
                  <span className="text-[12px] text-neutral-500">{selectedSize}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`min-w-[52px] border px-3 py-2 text-[12px] transition-colors focus:outline-none ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 text-neutral-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-[11px] text-red-500">Please select a size.</p>
              )}
            </div>
          )}

          <div className="mb-8">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
              Quantity
            </span>
            <div className="flex w-fit items-center border border-neutral-300">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="flex h-11 w-11 items-center justify-center text-lg text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="flex h-11 min-w-[48px] items-center justify-center border-x border-neutral-300 text-[14px] text-neutral-800 tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-lg text-neutral-600 transition-colors hover:bg-neutral-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus:outline-none ${
                added
                  ? "bg-neutral-700 text-white"
                  : "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]"
              }`}
            >
              {added ? "✓ Added to Bag" : "Add to Bag"}
            </button>
            <Link
              to="/cart"
              className="flex flex-1 items-center justify-center border border-black py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
            >
              View Bag
            </Link>
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-7">
            <ul className="flex flex-col gap-3">
              {FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-[13px] text-neutral-500">
                  <span className="mt-0.5 text-black">◇</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="bg-neutral-50 px-6 py-20 text-center md:px-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            The CHANEL Promise
          </p>
          <h2 className="font-serif text-2xl font-light leading-snug md:text-3xl">
            Crafted for Those Who Appreciate the Exceptional
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-neutral-500">
            Every CHANEL product is conceived in Paris and brought to life by a community
            of artisans who have dedicated their craft to the House&apos;s exacting standards.
            From first sketch to final finish, each piece reflects a legacy of excellence
            that has defined luxury for over a century.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
