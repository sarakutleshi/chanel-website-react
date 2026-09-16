import { useState, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import allProducts from "../data/all-products";
import SplitSlider from "../components/form/SplitSlider";
import AtelierForm from "../components/form/AtelierForm";

const TICKER = [
  "New — Fall–Winter 2026 Collection",
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
    src: "https://i.pinimg.com/1200x/ef/53/6e/ef536e9b698d23c75fe11db05eae2dc7.jpg",
    caption: "Boutique in Paris",
  },
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_480/q_auto:good,f_autoplus,dpr_1/1666771629238-1598436390994pa200500211jpgmaxlglgjpg_3000x2271.jpg",
    caption: "Chanel Haute Couture",
  },
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_480/q_auto:good,f_autoplus,dpr_1/1666769979453-15954241665431945americansoldiersdcropjpgmaxmdmdjpg_1128x974.jpg",
    caption: "Chanel in the U.S.",
  },
  {
    src: "https://i.pinimg.com/736x/0d/f8/46/0df846658321ede7fde28d52c9907159.jpg",
    caption: "Chanel Art Exhibition",
  },
];

const CATEGORIES = [
  {
    to: "/fashion",
    label: "Fashion",
    img: "https://i.pinimg.com/1200x/ce/ff/08/ceff081388f1761e8e0667a271810dbf.jpg",
  },
  {
    to: "/jewelry-watches",
    label: "Jewelry & Watches",
    img: "https://i.pinimg.com/1200x/bf/98/1e/bf981e3766c2b709fb5b4cffb7e4067c.jpg",
  },
  {
    to: "/makeup-skincare",
    label: "Makeup & Skincare",
    img: "https://i.pinimg.com/1200x/59/08/e9/5908e916a0fb7c01ed7794c0bd42d0d7.jpg",
  },
  {
    to: "/eyewear-fragrance",
    label: "Eyewear & Fragrance",
    img: "https://i.pinimg.com/736x/f3/c2/31/f3c23151b4874cbeaa85eda511e5dffb.jpg",
  },
];

function SpiritSection() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  const currentSlide = SPIRIT_SLIDES[active] ?? SPIRIT_SLIDES[0];

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    setActive(
      Math.min(
        Math.floor(((e.clientX - left) / width) * SPIRIT_SLIDES.length),
        SPIRIT_SLIDES.length - 1,
      ),
    );
  }, []);

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative h-[380px] cursor-crosshair overflow-hidden bg-neutral-200 md:h-[480px]"
        >
          {SPIRIT_SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.caption}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-6 pt-14 transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-white">
              {currentSlide.caption}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
            The House
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light leading-snug text-neutral-900 md:text-5xl">
            The spirit
            <br />
            of Chanel
          </h2>
          <div className="my-6 h-px w-10 bg-neutral-300" />
          <p className="text-sm leading-8 text-neutral-500">
            Founded by Gabrielle Bonheur Chanel in 1910, the House has become
            the embodiment of French elegance — a philosophy rooted in freedom,
            modernity and timeless beauty.
          </p>
          <p className="mt-4 text-sm leading-8 text-neutral-500">
            From the little black dress to the quilted 2.55 bag, every creation
            carries the spirit of a woman who dared to reimagine fashion.
          </p>
          <NavLink
            to="/about"
            className="mt-8 inline-flex items-center gap-2 border-b border-black pb-0.5 text-[11px] uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-50"
          >
            Discover the House <span aria-hidden>→</span>
          </NavLink>
          <div className="mt-8 flex gap-2">
            {SPIRIT_SLIDES.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={s.caption}
                className={`h-1.5 transition-all duration-300 ${active === i ? "w-8 bg-black" : "w-1.5 bg-neutral-300 hover:bg-neutral-500"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeSection() {
  const featured = allProducts.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <>
      <Navbar />

      <div className="overflow-hidden bg-neutral-900 py-2.5">
        <div className="flex animate-[ticker_26s_linear_infinite] gap-16 whitespace-nowrap will-change-transform">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="text-[10px] uppercase tracking-[0.18em] text-white/80"
            >
              {t}
              <span className="ml-16 text-white/15">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>

      <SplitSlider />

      <section className="bg-white px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
              Explore
            </p>
            <h2 className="mt-2 font-serif text-3xl font-light text-neutral-900 md:text-4xl">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.to}
                to={c.to}
                className="group flex flex-col gap-3 cursor-pointer transition-opacity duration-300 hover:opacity-70 "
              >
                <div className="relative aspect-[5/6] overflow-hidden rounded-2xl bg-neutral-100 h-full w-full">
                  <img
                    src={c.img}
                    alt={c.label}
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-700 transition-opacity duration-300 group-hover:opacity-50">
                  {c.label}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <AtelierForm />

      <SpiritSection />

      <Footer />
    </>
  );
}
