import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import allProducts from "../data/all-products";
import fashionLooks from "../data/fashion-looks";
import HeroSection from "../components/HeroSection";
import ChanelBoutiques from "../components/ChanelBoutiques.jsx";
import HorizontalScrollSection from "../components/HorizontalScrollSection.jsx";

const fashionProducts = allProducts.filter((p) => p.category === "Fashion");
const CATEGORIES = ["All", "Ready-to-Wear", "Outerwear", "Haute Couture"];

const SERVICES = [
  {
    title: "Personal Shopping",
    desc: "A private appointment with a fashion advisor, tailored to your wardrobe.",
  },
  {
    title: "Alterations",
    desc: "Expert adjustments by the House’s ateliers for a precise silhouette.",
  },
  {
    title: "Complimentary Delivery",
    desc: "Worldwide shipping, gift wrapping, and discreet packaging on every order.",
  },
];

function ShopCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const priceDisplay =
    typeof item.price === "number"
      ? item.price === 0
        ? "On request"
        : `$${item.price.toLocaleString()}`
      : item.price;

  function goToDetail() {
    navigate("/product", {
      state: {
        product: item,
        backPath: "/fashion",
        backLabel: "Fashion",
      },
    });
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart({
      id: item.id || item.name.toLowerCase().replace(/\s+/g, "-"),
      name: item.name,
      img: item.img,
      price: priceDisplay,
      category: item.subcategory || item.category,
      desc: item.desc,
    });
    setAdding(true);
    window.setTimeout(() => setAdding(false), 1400);
  }

  return (
    <article onClick={goToDetail} className="group flex cursor-pointer flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f3f0]">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {item.tag && (
          <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-white">
            {item.tag}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
              adding
                ? "bg-neutral-700 text-white"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {adding ? "✓ Added" : item.btn || "Add to bag"}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--muted)]">
          {item.subcategory || item.category}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.04em]">
            {item.name}
          </h3>
          <span className="shrink-0 text-[12px] tracking-[0.02em]">
            {priceDisplay}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Fashion() {
  const [category, setCategory] = useState("All");

  const products = useMemo(() => {
    if (category === "All") return fashionProducts;
    return fashionProducts.filter((item) => item.subcategory === category);
  }, [category]);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[var(--ink)]">
      <Navbar />

      <HeroSection
        src="https://i.pinimg.com/1200x/a9/d5/38/a9d53872488eadfeecaf20db80d7adf3.jpg"
        uppertitle="Haute Couture"
        title="Fall–Winter"
        description="2025 / 26"
        buttonText="Explore the Runway"
        href="#looks"
        fullPage
      />

      <HorizontalScrollSection
        items={fashionLooks}
        eyebrow="Fall–Winter 2025/26"
        title="Looks"
        subtitle="Graphic silhouettes, precious tweeds and sophisticated embellishment."
      />

      {/* Shop */}
      <section id="shop" className="px-[var(--pad)] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Selection
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide md:text-4xl">
                Shop the Collection
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`pb-1 text-[9px] uppercase tracking-[0.18em] transition-colors ${
                    category === cat
                      ? "border-b border-black text-black"
                      : "text-[var(--muted)] hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item, i) => (
              <ShopCard key={item.id || item.name || i} item={item} />
            ))}
          </div>

          {products.length === 0 && (
            <p className="py-20 text-center text-sm text-[var(--muted)]">
              No pieces in this category.
            </p>
          )}
        </div>
      </section>

      <section className="grid min-h-[70vh] grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/e5/fd/62/e5fd6211333a93af3e9982a0faef7d6e.jpg"
            alt="Haute Couture craftsmanship"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        <div className="flex flex-col justify-center bg-[#f7f6f4] px-[var(--pad)] py-16 lg:px-16 xl:px-24">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Savoir-Faire
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight tracking-wide md:text-5xl">
            Crafted in the
            <br />
            ateliers of Paris
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">
            Every silhouette is shaped by the House’s métiers — tweed,
            embroidery, and couture finishing refined over months of meticulous
            work.
          </p>
          <a
            href="#services"
            className="mt-10 self-start border-b border-black pb-1 text-[9px] uppercase tracking-[0.2em] transition-opacity hover:opacity-50"
          >
            Discover our services
          </a>
        </div>
      </section>

      <section
        id="services"
        className="border-y border-black/10 px-[var(--pad)] py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-10 text-center text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Client Services
          </p>

          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {SERVICES.map((service) => (
              <div key={service.title} className="text-center md:text-left">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.12em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChanelBoutiques />
      <Footer />
    </div>
  );
}
