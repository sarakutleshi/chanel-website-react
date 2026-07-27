import { useNavigate } from "react-router-dom";
import "./EyewearFragrance.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

import pinkImg from "../assets/eyewear/pink.jpg";
import rectangularImg from "../assets/eyewear/Rectangulare.jpg";
import shieldImg from "../assets/eyewear/ShieldSunglasses.jpg";
import squareImg from "../assets/eyewear/SquareSunglasses.jpg";
import bleuImg from "../assets/fragrance/BLEUDECHANEL.jpg";
import chanceImg from "../assets/fragrance/CHANCEEAUTENDRE.jpg";
import cocoImg from "../assets/fragrance/COCO.jpg";
import cocoMademoiselleImg from "../assets/fragrance/COCOMADEMOISELLE.jpg";
import gabrielleImg from "../assets/fragrance/GABRIELLECHANELESSENCE.jpg";

const eyewearProducts = [
  {
    img: pinkImg,
    category: "Sunglasses",
    name: "Rectangle Sunglasses",
    desc: "Lightweight acetate frames with rose-tinted lenses and interlocking CC logo at the temples.",
    price: "$870",
  },
  {
    img: squareImg,
    category: "Sunglasses",
    name: "Square Sunglasses",
    desc: "Bold square frames in polished black acetate — a modern take on a classic silhouette.",
    price: "$700",
  },
  {
    img: shieldImg,
    category: "Sunglasses",
    name: "Shield Sunglasses",
    desc: "Wraparound shield design with gradient lenses and a fine metal bridge detail.",
    price: "$890",
  },
  {
    img: rectangularImg,
    category: "Sunglasses",
    name: "Shield Sunglasses II",
    desc: "An oversized shield frame in burnished tortoiseshell acetate with UV400 protection.",
    price: "$800",
  },
];

const fragranceProducts = [
  {
    img: bleuImg,
    category: "Fragrance · Men",
    name: "Bleu de Chanel",
    desc: "A woody aromatic fragrance that exudes freedom — fresh citrus top notes over a warm, woody base.",
    price: "$80",
  },
  {
    img: chanceImg,
    category: "Fragrance · Women",
    name: "Chance Eau Tendre",
    desc: "A fresh, floral fragrance — a round and light harmony of grapefruit, jasmine and white musk.",
    price: "$95",
  },
  {
    img: cocoMademoiselleImg,
    category: "Fragrance · Women",
    name: "Coco Mademoiselle",
    desc: "An Oriental floral fragrance — bright orange top notes over a deep, sensual base of patchouli.",
    price: "$69.99",
  },
  {
    img: gabrielleImg,
    category: "Fragrance · Women",
    name: "Gabrielle Chanel Essence",
    desc: "A radiant floral with ylang-ylang, jasmine, orange blossom and tuberose at its heart.",
    price: "$100",
  },
];

const notes = [
  {
    cls: "",
    label: "Top Notes",
    title: "The Opening",
    desc: "The first impression — bright, volatile accords of citrus, bergamot, and aldehydes that announce a fragrance's character within seconds of application.",
    examples: "Grapefruit · Bergamot · Green leaves · Aldehydes",
  },
  {
    cls: "note-card--mid",
    label: "Heart Notes",
    title: "The Soul",
    desc: "The signature of a fragrance — floral, spicy or woody accords that emerge as the top notes fade, lasting several hours on the skin.",
    examples: "Jasmine · Rose · Ylang-Ylang · Iris",
  },
  {
    cls: "note-card--base",
    label: "Base Notes",
    title: "The Memory",
    desc: "The lasting impression — rich, deep accords of musk, amber and wood that anchor the fragrance and linger on skin and fabric for hours.",
    examples: "Patchouli · Sandalwood · Vetiver · Musk",
  },
];

function ProductCard({ item, backPath, backLabel }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", { state: { product: item, backPath, backLabel } });
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
      className="product-card"
      onClick={goToDetail}
      style={{ cursor: "pointer" }}
    >
      <div className="product-img-wrap">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <span className="product-price">{item.price}</span>
        <button className="btn-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function EyewearFragrance() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="eyewear-showcase" aria-label="Eyewear hero">
        <div className="eyewear-showcase-bg" />
        <div className="eyewear-showcase-text">
          <span className="hero-eyebrow">Collection 2024</span>
          <h1>Eyewear</h1>
          <h2>
            Adorned with heart charms, the frames of the CHANEL eyewear
            <br />
            collection highlight a feminine and elegant look.
          </h2>
          <a href="#eyewear-products" className="hero-btn">
            Explore Eyewear
          </a>
        </div>
      </section>

      {/* Eyewear */}
      <div className="section-label" id="eyewear-products">
        <h2>Sunglasses Selection</h2>
      </div>
      <div className="product-grid">
        {eyewearProducts.map((item, i) => (
          <ProductCard
            item={item}
            key={i}
            backPath="/eyewear-fragrance"
            backLabel="Eyewear & Fragrance"
          />
        ))}
      </div>

      {/* The Design */}
      <div className="section-label">
        <h2>The Design</h2>
      </div>
      <div className="editorial-split">
        <div className="editorial-img">
          <img
            src="https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/FSH-1703088359624-05blocdesktop.jpg"
            alt="Chanel eyewear design"
          />
        </div>
        <div className="editorial-text">
          <span className="eyebrow-label">Design Philosophy</span>
          <h2>Where Vision Meets Elegance</h2>
          <p>
            Every CHANEL eyewear frame is designed in Paris, where the
            House&apos;s artistic codes — the camellia, the quilted pattern, the
            interlocked CC — are reinterpreted in acetate, metal and crystal.
          </p>
          <p style={{ marginTop: "1.25rem" }}>
            The result is eyewear that is unmistakably CHANEL: refined yet
            playful, structured yet graceful — frames that frame not just the
            eyes, but the entire face with intention.
          </p>
          <p style={{ marginTop: "1.25rem" }}>
            Each pair is crafted from the finest materials, with lenses that
            meet the most rigorous optical standards, ensuring that style and
            protection are never a compromise.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span>✓</span> UV400 protection on all sun lenses
            </div>
            <div className="feature-item">
              <span>✓</span> Hand-finished acetate frames
            </div>
            <div className="feature-item">
              <span>✓</span> Signature CC temple detail
            </div>
            <div className="feature-item">
              <span>✓</span> Comes with CHANEL case and cloth
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance */}
      <div className="section-label">
        <h2>Fragrance</h2>
      </div>
      <div className="fragrance-intro">
        <p>
          Discover a selection of unforgettable scents — each one a portrait of
          a woman, each bottle a work of art crafted in Grasse, the perfume
          capital of the world.
        </p>
      </div>
      <div className="product-grid">
        {fragranceProducts.map((item, i) => (
          <ProductCard
            item={item}
            key={i}
            backPath="/eyewear-fragrance"
            backLabel="Eyewear & Fragrance"
          />
        ))}
      </div>

      {/* Olfactory World */}
      <div className="section-label">
        <h2>The Olfactory World</h2>
      </div>
      <div className="notes-grid">
        {notes.map((n, i) => (
          <div className={`note-card ${n.cls}`} key={i}>
            <div className="note-top">{n.label}</div>
            <h3>{n.title}</h3>
            <p>{n.desc}</p>
            <div className="note-examples">{n.examples}</div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
