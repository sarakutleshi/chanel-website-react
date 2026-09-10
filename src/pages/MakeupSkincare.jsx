import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const philosophyItems = [
  {
    icon: "✦",
    title: "Precision",
    desc: "Every formula is the result of years of research, tested to perfection before it meets your skin. Pigments, textures and finishes are calibrated for clarity and control.",
  },
  {
    icon: "✦",
    title: "Sensoriality",
    desc: "Textures that melt, scents that linger — beauty that engages every sense, not just sight. Each application is designed as a ritual of pleasure.",
  },
  {
    icon: "✦",
    title: "Longevity",
    desc: "From morning light to the last dance of the evening — colour and care that endures. Formulas built to stay luminous, comfortable and true.",
  },
  {
    icon: "✦",
    title: "Artistry",
    desc: "Inspired by the ateliers of Paris, each product is a gesture of craftsmanship in the palm of your hand — colour as couture, skincare as savoir-faire.",
  },
];

const carouselItems = [
  {
    bg: "https://i.pinimg.com/vwebp/1200x/1e/ae/38/1eae3857f62927904f858876f3f3f7d2.webp",
    title: "Rouge Allure Velvet",
    sub: "Luminous Matte Lip Colour",
    desc: "A velvety matte that wraps lips in intense colour and lasting comfort.",
  },
  {
    bg: "https://i.pinimg.com/736x/40/4c/9b/404c9bc881baf648cbf705732dd42dbb.jpg",
    title: "Les Beiges",
    sub: "Healthy Glow Foundation",
    desc: "A luminous base that perfects skin while keeping a natural glow.",
  },
  {
    bg: "https://i.pinimg.com/736x/76/67/b0/7667b0674997a6cb843745496b733f3c.jpg",
    title: "Stylo Yeux",
    sub: "Waterproof Long-Lasting Eye Liner",
    desc: "Precise definition that stays true from morning light to night.",
  },
  {
    bg: "https://i.pinimg.com/736x/bd/57/5f/bd575f62c5b74237d91f9f25003a0121.jpg",
    title: "Inimitable Mascara",
    sub: "Multi-Dimensional Volume",
    desc: "Structured lashes with volume, length and lasting intensity.",
  }
];

const skincareProducts = [
  {
    img: "https://i.pinimg.com/vwebp/1200x/a0/8c/3c/a08c3ccbf7799ececc8d9408d2ef2335.webp",
    category: "Serum",
    name: "Le Lift Sérum",
    desc: "A visibly firming and smoothing serum that targets the signs of aging at every level of the skin.",
    price: "$130",
  },
  {
    img: "https://i.pinimg.com/1200x/1d/3e/34/1d3e349a02181e56414497cad744c585.jpg",
    category: "Lotion",
    name: "Le Blanc Brightening Lotion",
    desc: "A brightening moisturising lotion that illuminates the complexion for a luminous, even skin tone.",
    price: "$80",
  },
  {
    img: "https://i.pinimg.com/736x/b7/95/d0/b795d07e5e6d580bb69b488a965523bf.jpg",
    category: "Serum",
    name: "Hydra Beauty Micro Serum",
    desc: "Intense replenishing hydration that visibly plumps and energises the skin from within.",
    price: "$115",
  },
];

function MakeupCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", {
      state: {
        product: item,
        backPath: "/makeup-skincare",
        backLabel: "Makeup & Skincare",
      },
    });
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart({
      id: item.name.toLowerCase().replace(/\s+/g, "-"),
      name: item.name,
      img: item.img,
      price: item.price,
      category: item.category,
      desc: item.desc,
    });
  }

  return (
    <article
      onClick={goToDetail}
      className="group flex cursor-pointer flex-col border border-neutral-200 transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="overflow-hidden bg-neutral-50">
        <img
          src={item.img}
          alt={item.name}
          className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {item.category}
        </span>
        <h3 className="font-serif text-base font-light leading-snug text-neutral-900">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-6 text-neutral-500">
          {item.desc}
        </p>
        <span className="mt-4 text-[14px] font-light text-neutral-800">
          {item.price}
        </span>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 self-start bg-black px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}

function SectionLabel({ id, children }) {
  return (
    <div
      id={id}
      className="flex items-center gap-6 px-6 py-10 md:px-16"
    >
      <div className="h-px flex-1 bg-neutral-200" />
      <h2 className="whitespace-nowrap font-serif text-[14px] font-light uppercase tracking-[0.28em] text-neutral">
        {children}
      </h2>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

export default function MakeupSkincare() {
  const cardsRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = cardsRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollRight(el.scrollLeft < max - 4);
  }

  function scrollCards(direction = 1) {
    if (!cardsRef.current) return;
    const card = cardsRef.current.querySelector("[data-card]");
    const cardWidth = card?.offsetWidth ?? 0;
    cardsRef.current.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 py-10 md:gap-20 md:px-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
            Beauty · Makeup & Skincare
          </p>
          <h1 className=" text-5xl font-light leading-[1.1] md:text-6xl lg:text-7xl">
            Make‑Up
          </h1>
          <p className="mt-6  text-xl font-light italic leading-relaxed text-neutral-600 md:text-2xl">
            Express. Enhance. Empower.
          
          </p>
          <p className="mt-5 text-[14px] leading-7 text-neutral-500">
            Unleash your inner artist — from subtle enhancements to bold
            statements. Discover the confidence that comes with every stroke of
            colour, shaped by the codes of the House.
          </p>
          <p className="mt-4 text-[14px] leading-7 text-neutral-400">
            Pigments refined in Paris, textures designed for comfort, and
            finishes that move with you from day to night. Makeup at CHANEL is
            never only colour — it is presence, character and light.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#makeup-products"
              className="inline-block border border-black px-8 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
            >
              Shop Makeup
            </a>
            <a
              href="#skincare-products"
              className="mt-2 inline-block border-b border-black/40 pb-4 text-[11px] uppercase tracking-[0.18em] text-neutral-500 transition-opacity hover:text-black"
            >
              Discover Skincare
            </a>
          </div>
        </div>

        <div className="overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/81/97/8b/81978b356608e9bd9cfa6ba125c6fa60.jpg"
            alt="Makeup promotional"
            className="h-[600px] w-full object-cover"
          />
        </div>
      </div>



      {/* Skincare ritual — ingredient-style product carousel */}
      <section
        id="makeup-products"
        className="border-y border-neutral-200 bg-[#f5f3f0] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 md:text-4xl">
            the makeup ritual
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-500">
            Every CHANEL creation is made from purposeful, high-performance
            formulas — colour and care at efficacious levels for a radiant
            complexion.
          </p>

          <div className="relative mt-10">
            <div
              ref={cardsRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {carouselItems.map((item, i) => (
                <article
                  key={i}
                  data-card
                  className="group relative h-[340px] w-[min(240px,70vw)] shrink-0 overflow-hidden rounded-2xl bg-neutral-200 sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-3rem)/4)]"
                >
                  <img
                    src={item.bg}
                    alt={item.title}
                    draggable="false"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-5 text-white/85">
                      {item.sub}. {item.desc}
                    </p>
                    <a
                      href="#skincare-products"
                      className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-white underline underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      Discover
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <div className="bg-neutral-900 px-6 py-24 text-center md:px-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-white/35">
            Words of the House
          </p>
          <h2 className="font-serif text-2xl font-light italic leading-relaxed text-white md:text-3xl">
            &ldquo;Beauty begins the moment you decide to be yourself.&rdquo;
          </h2>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/40">
            — Gabrielle Chanel
          </p>
          <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-white/45">
            A philosophy that still guides every shade, every cream, every
            gesture — beauty as freedom, never imitation.
          </p>
        </div>
      </div>

      {/* Skincare editorial */}
      <SectionLabel>Skincare</SectionLabel>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 pb-16 md:px-10 lg:grid-cols-2">
        <div className="overflow-hidden">
          <img
            src="https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp"
            alt="Chanel Skincare"
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Le Lift
          </p>
          <h2 className="font-serif text-3xl font-light leading-snug md:text-4xl">
            Discover the Beauty Within
          </h2>
          <p className="mt-6 text-[14px] leading-8 text-neutral-500">
            CHANEL skincare is rooted in the science of the camomille de Grasse —
            a flower cultivated exclusively for the House since 1987. Its
            remarkable properties inspire every formula in the skincare line,
            from targeted serums to deeply nourishing creams.
          </p>
          <p className="mt-5 text-[14px] leading-8 text-neutral-500">
            The LE LIFT range harnesses the anti-aging power of a concentrated
            active ingredient derived from alfalfa, visibly firming and smoothing
            the skin with each application.
          </p>
          <p className="mt-5 text-[14px] leading-8 text-neutral-500">
            Beyond correction, each ritual restores radiance and comfort —
            morning hydration, evening renewal, and the quiet luxury of skin that
            feels as refined as it looks.
          </p>
          <a
            href="#skincare-products"
            className="mt-7 inline-block border-b border-black pb-0.5 text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-50"
          >
            Explore Skincare →
          </a>
        </div>
      </div>

      <section
        id="makeup-products"
        className="border-y border-neutral-200 bg-[#f5f3f0] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 md:text-4xl">
            the scin-care ritual
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-500">
            Every CHANEL creation is made from purposeful, high-performance
            formulas — colour and care at efficacious levels for a radiant
            complexion.
          </p>

          <div className="relative mt-10">
            <div
              ref={cardsRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {carouselItems.map((item, i) => (
                <article
                  key={i}
                  data-card
                  className="group relative h-[340px] w-[min(240px,70vw)] shrink-0 overflow-hidden rounded-2xl bg-neutral-200 sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-3rem)/4)]"
                >
                  <img
                    src={item.bg}
                    alt={item.title}
                    draggable="false"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-5 text-white/85">
                      {item.sub}. {item.desc}
                    </p>
                    <a
                      href="#skincare-products"
                      className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-white underline underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      Discover
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Heritage & labs */}
      <section className="px-6 py-6 md:px-10 bg-neutral-50">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-14 border-b border-neutral-200 pb-16 md:grid-cols-2 md:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Heritage
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight md:text-4xl">
                A century of
                <br />
                feminine beauty
              </h2>
              <p className="mt-6 text-[14px] leading-8 text-neutral-500">
                Since Gabrielle Chanel first liberated the modern woman, the House
                has treated beauty as an extension of style — independent,
                elegant, never constrained by fashion’s whims.
              </p>
              <p className="mt-5 text-[14px] leading-8 text-neutral-500">
                Today that legacy lives in laboratories and ateliers where
                chemists and creatives work side by side, turning inspiration
                into formulas that feel as considered as a tweed jacket.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Innovation
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight md:text-4xl">
                Science in
                <br />
                service of skin
              </h2>
              <p className="mt-6 text-[14px] leading-8 text-neutral-500">
                Research at CHANEL is patient and exacting. Active ingredients
                are studied for efficacy and sensoriality alike — because a
                cream that works must also feel exquisite to wear.
              </p>
              <p className="mt-5 text-[14px] leading-8 text-neutral-500">
                From the fields of Grasse to the laboratories of Pantin, every
                step is guided by one question: how can beauty feel more
                intelligent, more intimate, more lasting?
              </p>
            </div>
          </div>
        </div>
      </section>




      {/* Boutique beauty services */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
            In Boutique
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light md:text-5xl">
            Beauty, personally advised
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-8 text-neutral-500">
            Visit a CHANEL boutique for a private consultation with a beauty
            advisor. Discover shades matched to your complexion, skincare tailored
            to your concerns, and techniques you can recreate at home.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-8 text-neutral-500">
            Appointments include complexion analysis, product sampling and a
            customised ritual — a moment of calm dedicated entirely to you.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-block border border-black px-8 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
          >
            Book a Consultation
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
