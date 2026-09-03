import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useCart } from "../context/CartContext";

// ── Slideshow images for Spirit section ──────────────────────────────────────
const SPIRIT_IMAGES = [
  { src: "https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831", caption: "Fall Collection" },
  { src: "https://i.pinimg.com/1200x/eb/fe/45/ebfe457d38f58088d8ce5f389101c66b.jpg", caption: "Fine Jewelry" },
  { src: "https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg", caption: "Haute Couture" },
  { src: "https://i.pinimg.com/1200x/cb/0c/03/cb0c03d470708243623c08fced11e87c.jpg", caption: "Eyewear 2026" },
];

// ── New arrivals ticker ───────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "New — Fall–Winter 2024 Collection",
  "Complimentary shipping on all orders",
  "New — Métiers d'Art 2025",
  "Free returns within 30 days",
  "New — Eyewear 2026 Collection",
  "Complimentary gift wrapping",
];

// ── Press / features ──────────────────────────────────────────────────────────
const PRESS = [
  { quote: "The definitive expression of French luxury.", source: "Vogue Paris" },
  { quote: "A collection that transcends time.", source: "Harper's Bazaar" },
  { quote: "Chanel continues to set the standard.", source: "WWD" },
];


// ── SpiritSection (mouse-hover slideshow) ─────────────────────────────────────
function SpiritSection() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - left;
    const idx = Math.min(
      Math.floor((relX / width) * SPIRIT_IMAGES.length),
      SPIRIT_IMAGES.length - 1
    );
    setActive(idx);
  }, []);

  return (
    <section className="bg-neutral-50 px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-neutral-400">The House</p>
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">The spirit of Chanel</h2>
          <p className="mt-5 text-sm leading-7 text-neutral-500">
            Discover the heritage and vision that continue to inspire the House of Chanel.
            From iconic fashion creations to exceptional beauty and jewelry, each collection
            carries its own story.
          </p>
          <NavLink
            to="/about"
            className="mt-6 inline-block border-b border-black pb-1 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
          >
            Discover the House
          </NavLink>
          <div className="mt-8 flex gap-2">
            {SPIRIT_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-black" : "w-1.5 bg-neutral-300"}`}
                aria-label={img.caption}
              />
            ))}
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative h-[360px] cursor-crosshair overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {SPIRIT_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.caption}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-5 pb-4 pt-10 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">
              {SPIRIT_IMAGES[active].caption}
            </p>
          </div>
          <div className={`absolute inset-0 flex transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}>
            {SPIRIT_IMAGES.map((_, i) => (
              <div key={i} className={`flex-1 border-r border-white/10 last:border-r-0 ${active === i ? "bg-white/5" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Announcement ticker ── */}
      <div className="overflow-hidden border-b border-neutral-200 bg-black py-2.5">
        <div className="flex animate-[ticker_30s_linear_infinite] gap-16 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.22em] text-white/80">
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative h-[72vh] overflow-hidden bg-neutral-900">
        <img
          src="https://i.pinimg.com/736x/4b/f8/a4/4bf8a4698481022fc097df6751c5ea1c.jpg"
          alt="Chanel fashion collection"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-8 pb-14 md:px-16">
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-white/60">The Collection</p>
          <h1 className="max-w-lg text-4xl font-light leading-tight tracking-wide text-white md:text-5xl">
            Timeless<br />Elegance
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
            Discover the latest creations, designed with the unmistakable spirit of Chanel.
          </p>
          <div className="mt-7 flex gap-3">
            <NavLink to="/shop" className="bg-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition hover:bg-neutral-200">
              Shop Now
            </NavLink>
            <NavLink to="/fashion" className="border border-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition hover:bg-white/10">
              Explore Fashion
            </NavLink>
          </div>
        </div>
      </section>



      {/* ── Intro text ── */}
      <section className="px-6 py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">CHANEL</p>
          <h2 className="mt-2 text-2xl font-light tracking-wide md:text-3xl">A world of creation</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-500">
            Explore the world of Chanel through fashion, beauty, jewelry, watches, eyewear and
            fragrance. Each creation reflects a unique combination of heritage, craftsmanship
            and contemporary elegance.
          </p>
          <div className="mx-auto mt-5 h-px w-10 bg-neutral-300" />
          <p className="mt-5 text-sm leading-7 text-neutral-500">
            Founded in 1910 by Gabrielle Bonheur Chanel, the House has become synonymous with
            a particular vision of femininity — one that is at once free, modern, and deeply
            rooted in the traditions of French craftsmanship.
          </p>
          <p className="mt-4 text-sm leading-7 text-neutral-500">
            From the iconic No. 5 fragrance to the little black dress, from the bouclé tweed
            jacket to the quilted 2.55 bag, every creation carries the enduring spirit of a
            woman who dared to imagine fashion differently.
          </p>
          <NavLink to="/about" className="mt-5 inline-block border-b border-neutral-400 pb-0.5 text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:border-black hover:text-black">
            Discover the House
          </NavLink>
        </div>
      </section>

      {/* ── New arrivals banner ── */}
      <section className="relative h-[320px] overflow-hidden">
        <img
          src="https://assets.vogue.com/photos/62274b72c0d4fbe60f143e7e/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg"
          alt="New Arrivals"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Just Arrived</p>
          <h2 className="mt-2 text-3xl font-light tracking-wide md:text-4xl">New Arrivals</h2>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            The latest pieces from the Fall–Winter 2024 collection are now available.
          </p>
          <NavLink
            to="/shop"
            className="mt-6 border border-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
          >
            Shop New Arrivals
          </NavLink>
        </div>
      </section>


      {/* ── Category grid ── */}
      <section className="px-6 pb-14 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mt-7">Explore</p>
            <h2 className="mt-1 text-2xl font-light tracking-wide">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { to: "/fashion", img: "https://www.chanel.com/images/as///f_auto,q_auto:good,dpr_1.1/w_960/-83449175.jpg", label: "Fashion", title: "Collections" },
              { to: "/jewelry-watches", img: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1774971379721-guide-et-conseil_1948x1948.jpg", label: "Jewelry & Watches", title: "Timeless Pieces" },
              { to: "/makeup-skincare", img: "https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp", label: "Makeup & Skincare", title: "Beauty" },
              { to: "/eyewear-fragrance", img: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1783525197180-vl-cgp-1h2026-edp-200ml-line-dotcom-edito-push-1.jpg", label: "Eyewear & Fragrance", title: "Signature Scents" },
            ].map(({ to, img, label, title }) => (
              <NavLink key={to} to={to} className="group relative h-[300px] overflow-hidden">
                <img src={img} alt={label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/35" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">{label}</p>
                  <h3 className="mt-1 text-xl font-light">{title}</h3>
                </div>
                <span className="absolute bottom-6 right-6 translate-x-2 text-lg text-white/0 transition duration-300 group-hover:translate-x-0 group-hover:text-white/80">→</span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spirit of Chanel (slideshow) ── */}
      <SpiritSection />

      {/* ── Press quotes ── */}
      <section className="border-y border-neutral-200 px-6 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRESS.map((p) => (
              <div key={p.source} className="text-center">
                <p className="font-serif text-base font-light italic leading-7 text-neutral-700">
                  &ldquo;{p.quote}&rdquo;
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                  — {p.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galerie strip ── */}
      <section className="px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Inspiration</p>
              <h2 className="mt-1 text-2xl font-light tracking-wide">Galerie</h2>
            </div>
            <NavLink to="/galerie" className="hidden border-b border-black pb-0.5 text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50 md:block">
              View Galerie
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { src: "https://i.pinimg.com/vwebp/1200x/04/54/1a/04541a75ccefcac6a2b5a95b3ca9e7ea.webp", alt: "Chanel editorial" },
              { src: "https://i.pinimg.com/736x/06/fb/8d/06fb8d53472c9ba1f4db5f0a1bee386f.jpg", alt: "Fashion editorial" },
              { src: "https://a.1stdibscdn.com/chanel-vintage-s-s-1988-white-black-lace-camellia-bow-dress-gown-for-sale-picture-6/v_32222/v_256057721741135017454/chanel_vintage_spring_1988_white_black_lace_camellia_bow_dress_gown_3_master.jpg?disable=upscale&auto=webp&quality=60&width=1400", alt: "Fashion style" },
              { src: "https://i.pinimg.com/vwebp/736x/d5/5b/16/d55b167415f548b264b54dd59c6fc574.webp", alt: "Fashion collection" },
            ].map(({ src, alt }) => (
              <div key={src} className="group overflow-hidden">
                <img src={src} alt={alt} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
          <NavLink to="/galerie" className="mt-6 block text-center text-[11px] uppercase tracking-[0.18em] underline underline-offset-8 md:hidden">
            View Galerie
          </NavLink>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-neutral-900 px-6 py-14 text-center md:px-10">
        <div className="mx-auto max-w-lg">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Stay Connected</p>
          <h2 className="mt-2 text-2xl font-light tracking-wide text-white md:text-3xl">
            The world of CHANEL, delivered
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Be the first to discover new collections, exclusive events and the latest from the House.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border-b border-white/30 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white"
            />
            <button
              type="submit"
              className="flex-shrink-0 border border-white px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-[10px] text-white/25">
            By subscribing you agree to our privacy policy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-neutral-200 px-6 py-14 text-center md:py-16">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Discover More</p>
        <h2 className="mt-2 text-2xl font-light tracking-wide md:text-3xl">Enter the world of Chanel</h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NavLink to="/shop" className="border border-black bg-black px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800">
            Shop Now
          </NavLink>
          <NavLink to="/about" className="border border-neutral-300 px-8 py-3 text-[11px] uppercase tracking-[0.2em] transition hover:border-black">
            About Chanel
          </NavLink>
        </div>
      </section>

      <Footer />
    </>
  );
}
