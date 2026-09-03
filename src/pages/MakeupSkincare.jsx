import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const philosophyItems = [
  { icon: "✦", title: "Precision", desc: "Every formula is the result of years of research, tested to perfection before it meets your skin." },
  { icon: "✦", title: "Sensoriality", desc: "Textures that melt, scents that linger — beauty that engages every sense, not just sight." },
  { icon: "✦", title: "Longevity", desc: "From morning light to the last dance of the evening — color and care that endures." },
  { icon: "✦", title: "Artistry", desc: "Inspired by the ateliers of Paris, each product is a gesture of craftsmanship in the palm of your hand." },
];

const carouselItems = [
  { bg: "https://i.pinimg.com/vwebp/1200x/1e/ae/38/1eae3857f62927904f858876f3f3f7d2.webp", title: "Rouge Allure Velvet", sub: "Luminous Matte Lip Colour" },
  { bg: "https://i.pinimg.com/736x/40/4c/9b/404c9bc881baf648cbf705732dd42dbb.jpg", title: "Les Beiges", sub: "Healthy Glow Foundation" },
  { bg: "https://i.pinimg.com/736x/76/67/b0/7667b0674997a6cb843745496b733f3c.jpg", title: "Stylo Yeux", sub: "Waterproof Long-Lasting Eye Liner" },
  { bg: "https://i.pinimg.com/736x/bd/57/5f/bd575f62c5b74237d91f9f25003a0121.jpg", title: "Inimitable Mascara", sub: "Multi-Dimensional Volume" },
  { bg: "https://i.pinimg.com/vwebp/1200x/47/41/5e/47415e050d2225d368a3716a28dbb25c.webp", title: "Joues Contraste", sub: "Powder Blush" },
  { bg: "https://i.pinimg.com/vwebp/1200x/b2/32/06/b232066cdb134dd94f7557b570964d50.webp", title: "Ombre Première", sub: "Longwear Powder Eyeshadow" },
];

const makeupProducts = [
  { img: "https://i.pinimg.com/736x/62/53/84/62538407aa186cb2820528b20df07d57.jpg", category: "Lips", name: "Rouge Allure Velvet", desc: "Luminous matte lip colour — a velvety texture that wraps lips in intense colour and comfort.", price: "$42" },
  { img: "https://i.pinimg.com/736x/c8/a9/75/c8a975da6bef11dfa4a4d1d1fffa06f1.jpg", category: "Face", name: "Les Beiges Foundation", desc: "A healthy glow foundation that perfects skin while maintaining a natural, luminous look.", price: "$65" },
  { img: "https://i.pinimg.com/1200x/61/7a/23/617a237167babc57682eefe399fbbfed.jpg", category: "Eyes", name: "Le Volume de Chanel", desc: "A volumising mascara that builds intense, structured lashes with a dramatic curved brush.", price: "$38" },
  { img: "https://i.pinimg.com/736x/76/67/b0/7667b0674997a6cb843745496b733f3c.jpg", category: "Cheeks", name: "Joues Contraste", desc: "A powder blush that sculpts and enhances the complexion with a silky, buildable pigment.", price: "$55" },
  { img: "https://i.pinimg.com/736x/69/8f/5f/698f5f544f0f7db94f7fe958d43331a4.jpg", category: "Eyes", name: "Ombre Première", desc: "Long-wear powder eyeshadow for a sophisticated, multi-dimensional eye look.", price: "$40" },
  { img: "https://i.pinimg.com/736x/27/60/8a/27608ad5f46e3c640b5e523a4672002b.jpg", category: "Lips", name: "Rouge Coco Flash", desc: "Colour, shine and intensity in a flash — a lightweight lip colour with a glossy finish.", price: "$40" },
];

const skincareProducts = [
  { img: "https://i.pinimg.com/vwebp/1200x/a0/8c/3c/a08c3ccbf7799ececc8d9408d2ef2335.webp", category: "Serum", name: "Le Lift Sérum", desc: "A visibly firming and smoothing serum that targets the signs of aging at every level of the skin.", price: "$130" },
  { img: "https://i.pinimg.com/1200x/1d/3e/34/1d3e349a02181e56414497cad744c585.jpg", category: "Lotion", name: "Le Blanc Brightening Lotion", desc: "A brightening moisturising lotion that illuminates the complexion for a luminous, even skin tone.", price: "$80" },
  { img: "https://i.pinimg.com/736x/b7/95/d0/b795d07e5e6d580bb69b488a965523bf.jpg", category: "Serum", name: "Hydra Beauty Micro Serum", desc: "Intense replenishing hydration that visibly plumps and energises the skin from within.", price: "$115" },
];

// ── Product card ──────────────────────────────────────────────────────────────
function MakeupCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", {
      state: { product: item, backPath: "/makeup-skincare", backLabel: "Makeup & Skincare" },
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
      {/* Image */}
      <div className="overflow-hidden bg-neutral-50">
        <img
          src={item.img}
          alt={item.name}
          className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {item.category}
        </span>
        <h3 className="font-serif text-base font-light leading-snug text-neutral-900">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-6 text-neutral-500">{item.desc}</p>
        <span className="mt-4 text-[14px] font-light text-neutral-800">{item.price}</span>
        <button
          onClick={handleAddToCart}
          className="mt-3 self-start bg-black px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-6 px-6 py-14 md:px-16">
      <div className="h-px flex-1 bg-neutral-200" />
      <h2 className="whitespace-nowrap font-serif text-[11px] font-light uppercase tracking-[0.28em] text-neutral-400">
        {children}
      </h2>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MakeupSkincare() {
  const cardsRef = useRef(null);

  function scrollCards(direction) {
    if (!cardsRef.current) return;
    const card = cardsRef.current.querySelector("[data-card]");
    const cardWidth = card?.offsetWidth ?? 0;
    cardsRef.current.scrollLeft += direction * (cardWidth + 24);
  }

  return (
    <>
      <Navbar />

      {/* ── Hero split ── */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-20 px-6 py-20 md:px-10 lg:grid-cols-2">
        {/* Text */}
        <div>
          <h1 className="font-serif text-5xl font-light leading-[1.1] md:text-6xl lg:text-7xl">
            Make‑Up
          </h1>
          <p className="mt-6 text-base font-light leading-8 text-neutral-500">
            Express. Enhance. Empower.
            <br />
            The power of Make‑up
          </p>
          <p className="mt-4 text-[14px] leading-7 text-neutral-400">
            Unleash your inner artist, from subtle enhancements to bold statements,
            discover the confidence that comes with every stroke of color.
          </p>
          <a
            href="#makeup-products"
            className="mt-8 inline-block border border-black px-8 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
          >
            Shop Products
          </a>
        </div>

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/81/97/8b/81978b356608e9bd9cfa6ba125c6fa60.jpg"
            alt="Makeup promotional"
            className="h-[600px] w-full object-cover"
          />
        </div>
      </div>

      {/* ── Philosophy band ── */}
      <div className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-neutral-200 px-6 md:grid-cols-4 md:px-10">
          {philosophyItems.map((item) => (
            <div key={item.title} className="px-8 py-10 text-center">
              <p className="mb-3 text-lg text-neutral-300">{item.icon}</p>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                {item.title}
              </h3>
              <p className="text-[12px] leading-6 text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Carousel ── */}
      <SectionLabel id="makeup-products">Makeup Selection</SectionLabel>

      <div className="relative flex items-center gap-4 overflow-hidden px-6 pb-16 md:px-10">
        {/* Left arrow */}
        <button
          onClick={() => scrollCards(-1)}
          aria-label="Scroll left"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors hover:bg-neutral-100"
        >
          &#10094;
        </button>

        {/* Cards track */}
        <div
          ref={cardsRef}
          className="flex flex-1 gap-6 overflow-x-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {carouselItems.map((item, i) => (
            <div
              key={i}
              data-card
              className="relative h-[420px] min-w-[calc(25%-1.125rem)] flex-shrink-0 cursor-pointer overflow-hidden transition-transform duration-400 hover:scale-[1.02] max-[900px]:min-w-[calc(50%-0.75rem)] max-[640px]:min-w-full"
              style={{ backgroundImage: `url(${item.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 p-5">
                <h3 className="font-serif text-base font-light text-white">{item.title}</h3>
                <p className="mt-0.5 text-[11px] tracking-[0.08em] text-white/70">{item.sub}</p>
                <a
                  href="#"
                  className="mt-3 inline-block border border-white/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/15"
                >
                  Discover
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollCards(1)}
          aria-label="Scroll right"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors hover:bg-neutral-100"
        >
          &#10095;
        </button>
      </div>

      {/* ── Makeup product grid ── */}
      <div
        id="makeup-products"
        className="mx-auto mt-8 grid max-w-[1200px] grid-cols-1 gap-8 px-6 pb-20 sm:grid-cols-2 md:px-10 lg:grid-cols-3"
      >
        {makeupProducts.map((item, i) => (
          <MakeupCard item={item} key={i} />
        ))}
      </div>

      {/* ── Skincare section ── */}
      <SectionLabel>Skincare</SectionLabel>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 pb-20 md:px-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src="https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp"
            alt="Chanel Skincare"
            className="h-[520px] w-full object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Le Lift
          </p>
          <h2 className="font-serif text-3xl font-light leading-snug md:text-4xl">
            Discover the Beauty Within
          </h2>
          <p className="mt-6 text-[14px] leading-8 text-neutral-500">
            CHANEL skincare is rooted in the science of the camomille de Grasse — a flower
            cultivated exclusively for the House since 1987. Its remarkable properties inspire
            every formula in the skincare line, from targeted serums to deeply nourishing creams.
          </p>
          <p className="mt-5 text-[14px] leading-8 text-neutral-500">
            The LE LIFT range harnesses the anti-aging power of a concentrated active ingredient
            derived from alfalfa, visibly firming and smoothing the skin with each application.
          </p>
          <a
            href="#skincare-products"
            className="mt-7 inline-block border-b border-black pb-0.5 text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-50"
          >
            Explore Skincare →
          </a>
        </div>
      </div>

      {/* ── Skincare product grid ── */}
      <div
        id="skincare-products"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 pb-24 sm:grid-cols-2 md:px-10 lg:grid-cols-3"
      >
        {skincareProducts.map((item, i) => (
          <MakeupCard item={item} key={i} />
        ))}
      </div>

      {/* ── Ritual banner ── */}
      <div className="bg-neutral-900 px-6 py-24 text-center md:px-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-2xl font-light italic leading-relaxed text-white md:text-3xl">
            &ldquo;Beauty begins the moment you decide to be yourself.&rdquo;
          </h2>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/40">
            — Gabrielle Chanel
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
