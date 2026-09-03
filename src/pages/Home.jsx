import { useState, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import allProducts from "../data/all-products";
import SplitSlider from "../components/SplitSlider";
import "../index.css";
import HeroSection from "../components/HeroSection";
// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const TICKER = [
  "New — Fall–Winter 2024 Collection",
  "Complimentary worldwide shipping",
  "Free returns within 30 days",
  "New — Eyewear 2026",
  "Complimentary gift wrapping",
];

const FEATURED_IDS = [
  "tweed-jacket",
  "rouge-allure-velvet",
  "coco-crush-ring",
  "chance-eau-tendre",
  "j12-watch",
  "shield-sunglasses",
];

const SPIRIT_SLIDES = [
  {
    src: "https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831",
    caption: "Fall Collection",
  },
  {
    src: "https://i.pinimg.com/1200x/eb/fe/45/ebfe457d38f58088d8ce5f389101c66b.jpg",
    caption: "Fine Jewelry",
  },
  {
    src: "https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg",
    caption: "Haute Couture",
  },
  {
    src: "https://i.pinimg.com/1200x/cb/0c/03/cb0c03d470708243623c08fced11e87c.jpg",
    caption: "Eyewear 2026",
  },
];

const CATEGORIES = [
  {
    to: "/fashion",
    img: "https://assets.vogue.com/photos/62274b7cf1c0bf717ac69a97/master/w_1920,c_limit/00006-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    label: "Fashion",
  },
  {
    to: "/jewelry-watches",
    img: "https://i.pinimg.com/736x/d6/e2/2c/d6e22c7fbdfb4b3e135e91b7554812f9.jpg",
    label: "Jewelry & Watches",
  },
  {
    to: "/makeup-skincare",
    img: "https://i.pinimg.com/736x/62/53/84/62538407aa186cb2820528b20df07d57.jpg",
    label: "Makeup & Skincare",
  },
  {
    to: "/eyewear-fragrance",
    img: "https://i.pinimg.com/736x/86/81/a8/8681a8244aaffbe534d40e0cb1370db2.jpg",
    label: "Eyewear & Fragrance",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const price =
    product.price === 0 ? "On request" : `$${product.price.toLocaleString()}`;

  function go() {
    navigate("/product", {
      state: { product, backPath: "/home", backLabel: "Home" },
    });
  }

  function handleAdd(e) {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      img: product.img,
      price,
      category: product.category,
      desc: product.desc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article onClick={go} className="group cursor-pointer">
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] ${
              added
                ? "bg-neutral-700 text-white"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {added ? "✓ Added" : "Add to Bag"}
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-0.5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {product.subcategory}
        </p>
        <p className="text-[13px] font-medium text-neutral-900">
          {product.name}
        </p>
        <p className="text-[13px] font-light text-neutral-500">{price}</p>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPIRIT SLIDESHOW  (mouse-tracking image switcher)
// ─────────────────────────────────────────────────────────────────────────────

function SpiritSection() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const i = Math.min(
      Math.floor(((e.clientX - left) / width) * SPIRIT_SLIDES.length),
      SPIRIT_SLIDES.length - 1,
    );
    setActive(i);
  }, []);

  return (
    <section className="bg-neutral-50 px-6 py-20 md:px-16 md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
        {/* Image — left on desktop */}
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative h-[460px] cursor-crosshair overflow-hidden order-2 md:order-1"
        >
          {SPIRIT_SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.caption}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Caption */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 pb-6 pt-14 transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-white">
              {SPIRIT_SLIDES[active].caption}
            </p>
          </div>
        </div>

        {/* Text — right on desktop */}
        <div className="order-1 md:order-2">
          <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
            The House
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light leading-snug text-neutral-900 md:text-5xl">
            The spirit
            <br />
            of Chanel
          </h2>
          <div className="my-7 h-px w-10 bg-neutral-300" />
          <p className="text-sm leading-8 text-neutral-500">
            Founded by Gabrielle Bonheur Chanel in 1910, the House has become
            the embodiment of French elegance — a philosophy rooted in freedom,
            modernity and the pursuit of timeless beauty.
          </p>
          <p className="mt-4 text-sm leading-8 text-neutral-500">
            From the little black dress to the quilted 2.55 bag, every creation
            carries the spirit of a woman who dared to reimagine fashion.
          </p>
          <NavLink
            to="/about"
            className="mt-8 inline-flex items-center gap-2 border-b border-black pb-0.5 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
          >
            Discover the House <span>→</span>
          </NavLink>

          {/* Dot indicators */}
          <div className="mt-10 flex gap-2">
            {SPIRIT_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 bg-black"
                    : "w-1.5 bg-neutral-300 hover:bg-neutral-500"
                }`}
                aria-label={s.caption}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const featured = allProducts.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <>
      <Navbar />

      {/* 1 ── Ticker ───────────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-neutral-900 py-2.5">
        <div className="flex animate-[ticker_26s_linear_infinite] gap-16 whitespace-nowrap will-change-transform">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="text-[10px] uppercase tracking-[0.26em] text-white/55"
            >
              {t}
              <span className="ml-16 text-white/15">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      <HeroSection
        uppertitle="New Arrivals"
        title="Discover the latest collections"
        src=""
      />
      {/* 2 ── Split-panel hero slider ────────────────────────────────────── */}
      <SplitSlider />
      {/* ── Category grid ── */}
      <section className="px-6 pb-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mt-7">
              Explore
            </p>
            <h2 className="mt-1 text-2xl font-light tracking-wide">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                to: "/fashion",
                img: "https://www.chanel.com/images/as///f_auto,q_auto:good,dpr_1.1/w_960/-83449175.jpg",
                label: "Fashion",
                title: "Collections",
              },
              {
                to: "/jewelry-watches",
                img: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1774971379721-guide-et-conseil_1948x1948.jpg",
                label: "Jewelry & Watches",
                title: "Timeless Pieces",
              },
              {
                to: "/makeup-skincare",
                img: "https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp",
                label: "Makeup & Skincare",
                title: "Beauty",
              },
              {
                to: "/eyewear-fragrance",
                img: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1783525197180-vl-cgp-1h2026-edp-200ml-line-dotcom-edito-push-1.jpg",
                label: "Eyewear & Fragrance",
                title: "Signature Scents",
              },
            ].map(({ to, img, label, title }) => (
              <NavLink
                key={to}
                to={to}
                className="group relative h-[300px] overflow-hidden"
              >
                <img
                  src={img}
                  alt={label}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/35" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                    {label}
                  </p>
                  <h3 className="mt-1 text-xl font-light">{title}</h3>
                </div>
                <span className="absolute bottom-6 right-6 translate-x-2 text-lg text-white/0 transition duration-300 group-hover:translate-x-0 group-hover:text-white/80">
                  →
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* 2 ── Split-panel hero slider ────────────────────────────────────── */}
      <SplitSlider />

      {/* 4 ── Full-bleed editorial ─────────────────────────────────────────── */}
      <section className="relative h-[520px] overflow-hidden md:h-[620px]">
        <img
          src="https://assets.vogue.com/photos/62274b72c0d4fbe60f143e7e/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg"
          alt="The Collection"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/50">
            The Collection
          </p>
          <h2 className="mt-4 font-serif text-5xl font-light leading-tight text-white md:text-6xl">
            Fall–Winter 2024
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/60">
            A season defined by precision tailoring, exceptional tweeds and the
            enduring codes of the House.
          </p>
          <NavLink
            to="/fashion"
            className="mt-9 border border-white/60 px-10 py-4 text-[11px] uppercase tracking-[0.26em] text-white transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Explore the Collection
          </NavLink>
        </div>
      </section>

      {/* 5 ── Featured Products ───────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-20 m-10">
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => {
              document.getElementById("featured-products")?.scrollBy({
                left: -360,
                behavior: "smooth",
              });
            }}
            className="absolute left-2 top-[40%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg transition hover:bg-black hover:text-white"
          >
            ←
          </button>

          {/* Products */}
          <div
            id="featured-products"
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth"
          >
            {featured.map((p) => (
              <div
                key={p.id}
                className="w-[280px] shrink-0 md:w-[320px] lg:w-[350px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => {
              document.getElementById("featured-products")?.scrollBy({
                left: 360,
                behavior: "smooth",
              });
            }}
            className="absolute right-2 top-[40%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg transition hover:bg-black hover:text-white"
          >
            →
          </button>
        </div>
      </section>
      {/* 6 ── Spirit of Chanel ─────────────────────────────────────────────── */}
      <SpiritSection />

      {/* 7 ── Galerie ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
                Inspiration
              </p>
              <h2 className="mt-2 font-serif text-3xl font-light text-neutral-900">
                Galerie
              </h2>
            </div>
            <NavLink
              to="/galerie"
              className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-black"
            >
              View All →
            </NavLink>
          </div>

          {/* Asymmetric grid */}
          <div className="grid h-[460px] grid-cols-3 grid-rows-2 gap-2">
            <div className="group col-span-2 row-span-2 overflow-hidden">
              <img
                src="https://i.pinimg.com/vwebp/1200x/04/54/1a/04541a75ccefcac6a2b5a95b3ca9e7ea.webp"
                alt="Chanel editorial"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="group overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/06/fb/8d/06fb8d53472c9ba1f4db5f0a1bee386f.jpg"
                alt="Fashion editorial"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="group overflow-hidden">
              <img
                src="https://i.pinimg.com/vwebp/736x/d5/5b/16/d55b167415f548b264b54dd59c6fc574.webp"
                alt="Fashion collection"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8 ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 px-6 py-16 text-center md:px-16 md:py-20">
        <div className="mx-auto max-w-md">
          <p className="text-[10px] uppercase tracking-[0.38em] text-white/35">
            Stay in the know
          </p>
          <h2 className="mt-3 font-serif text-3xl font-light text-white md:text-4xl">
            The world of CHANEL,
            <br />
            delivered to you
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-neutral-200"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-5 text-[10px] text-white/20">
            Unsubscribe at any time · Privacy Policy
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
