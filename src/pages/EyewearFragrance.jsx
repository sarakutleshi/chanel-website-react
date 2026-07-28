import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
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
import cocoMademoiselleImg from "../assets/fragrance/COCOMADEMOISELLE.jpg";
import gabrielleImg from "../assets/fragrance/GABRIELLECHANELESSENCE.jpg";

const eyewearProducts = [
  {
    img: "https://www.chanel.com/images/as///c_crop,w_1.0,h_0.53,y_0.188,t_fashioncommercial_trim,f_auto,q_auto:good,dpr_1.1/w_1600/-81226956.jpg",
    category: "Sunglasses",
    name: "Rectangle Sunglasses",
    desc: "Lightweight acetate frames with rose-tinted lenses and interlocking CC logo at the temples.",
    price: "$870",
  },
  {
    img: "https://www.chanel.com/images/as///c_crop,w_1.0,h_0.53,y_0.188,t_fashioncommercial_trim,f_auto,q_auto:good,dpr_1.1/w_1600/-79086741.jpg",
    category: "Sunglasses",
    name: "Square Sunglasses",
    desc: "Bold square frames in polished black acetate — a modern take on a classic silhouette.",
    price: "$700",
  },
  {
    img: "https://www.chanel.com/images///c_crop,w_1.0,h_0.53,y_0.188,t_fashioncommercial_trim,f_auto,q_auto:good,dpr_1.1/w_1600/-9569737146398.jpg",
    category: "Sunglasses",
    name: "Shield Sunglasses",
    desc: "Wraparound shield design with gradient lenses and a fine metal bridge detail.",
    price: "$890",
  },
  {
    img: "https://www.chanel.com/images///c_crop,w_1.0,h_0.53,y_0.188,t_fashioncommercial_trim,f_auto,q_auto:good,dpr_1.1/w_1600/-9540997021726.jpg",
    category: "Sunglasses",
    name: "Shield Sunglasses II",
    desc: "An oversized shield frame in burnished tortoiseshell acetate with UV400 protection.",
    price: "$800",
  },
];

const fragranceProducts = [
  {
    img: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/c_limit,w_1920,h_1920/f_auto/paris-biarritz-les-eaux-de-chanel-eau-de-toilette-spray-4-2fl-oz--packshot-default-102410-9564851535902.jpg",
    category: "Fragrance · Men",
    name: "Bleu de Chanel",
    desc: "A woody aromatic fragrance that exudes freedom — fresh citrus top notes over a warm, woody base.",
    price: "$80",
  },
  {
    img: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/c_limit,w_1920,h_1920/f_auto/paris-edimbourg-les-eaux-de-chanel-eau-de-toilette-spray-4-2fl-oz--packshot-default-102747-9589583872030.jpg",
    category: "Fragrance · Women",
    name: "Chance Eau Tendre",
    desc: "A fresh, floral fragrance — a round and light harmony of grapefruit, jasmine and white musk.",
    price: "$95",
  },
  {
    img: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/c_limit,w_1920,h_1920/f_auto/chance-eau-splendide-hair-and-body-oil-5fl-oz--packshot-default-136270-9575317241886.jpg",
    category: "Fragrance · Women",
    name: "Coco Mademoiselle",
    desc: "An Oriental floral fragrance — bright orange top notes over a deep, sensual base of patchouli.",
    price: "$69.99",
  },
  {
    img: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/c_limit,w_1920,h_1920/f_auto/chance-eau-tendre-eau-de-toilette-twist-and-spray-3x0-7fl-oz--packshot-default-126300-9565095952414.jpg",
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

function ProductCarousel({
  products,
  title,
  titleClass = "",
  sectionId,
  backPath,
  backLabel,
}) {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [wished, setWished] = useState({});

  function scroll(dir) {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".ew-card");
    const gap = 24;
    const step = card ? card.offsetWidth + gap : 340;
    trackRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function toggleWish(e, id) {
    e.stopPropagation();
    setWished((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="ew-carousel-section" id={sectionId}>
      <h2
        className={`ew-carousel-title ${titleClass}`}
        style={{ fontSize: "1.5rem" }}
      >
        {title}
      </h2>

      <div className="ew-carousel-wrapper">
        <div className="ew-track" ref={trackRef}>
          {products.map((item, i) => {
            const id = item.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <article
                key={i}
                className="ew-card"
                onClick={() =>
                  navigate("/product", {
                    state: { product: item, backPath, backLabel },
                  })
                }
              >
                <div className="ew-card-img">
                  <img src={item.img} alt={item.name} />
                  <button
                    className={`ew-wish-btn ${wished[id] ? "ew-wish-btn--active" : ""}`}
                    onClick={(e) => toggleWish(e, id)}
                    aria-label={
                      wished[id] ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    {wished[id] ? "★" : "☆"}
                  </button>
                </div>

                <div className="ew-card-info">
                  <p className="ew-card-name">{item.name.toUpperCase()}</p>
                  <button
                    className="ew-view-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/product", {
                        state: { product: item, backPath, backLabel },
                      });
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <button
          className="ew-arrow"
          onClick={() => scroll(1)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}

const highlights = [
  {
    img: "https://i.pinimg.com/736x/54/ba/c5/54bac512d94e7bff98a8bf7cd04d6017.jpg",
    label: "HIGHLIGHTS",
    title: "MÉTIERS D'ART 2026 EYEWEAR COLLECTION",
  },
  {
    img: "https://i.pinimg.com/736x/5c/d7/f3/5cd7f3088cd540a0ca1a587e296ecc10.jpg",
    label: "HIGHLIGHTS",
    title: "SPRING SUMMER 2026 COLLECTION",
  },
  {
    img: "https://i.pinimg.com/1200x/6e/a7/e1/6ea7e1ce9babdef8a4f8956392489921.jpg",
    fallback:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    label: "HIGHLIGHTS",
    title: "A SUMMER FEEL",
  },
];

function EyewearHighlights() {
  const [active, setActive] = useState(0);

  return (
    <section className="hl-section">
      <h2 className="hl-title" style={{ fontSize: "1.5rem", fontWeight : 550 }} >HIGHLIGHTS</h2>

      <div className="hl-grid">
        {highlights.map((item, i) => (
          <div className="hl-card" key={i}>
            <img
              src={item.img}
              alt={item.title}
            />
            <div className="hl-card-overlay">
              <span className="hl-card-label">{item.label}</span>
              <p className="hl-card-title" >{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hl-dots">
        {[0, 1].map((i) => (
          <button
            key={i}
            className={`hl-dot ${active === i ? "hl-dot--active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

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
            collection highlight a feminine and elegant look.
          </h2>
          <a href="#eyewear-products" className="hero-btn">
            Explore cOLLECTION
          </a>
        </div>
      </section>

      {/* Highlights */}
      <EyewearHighlights />

      <ProductCarousel
        products={eyewearProducts}
        title="EyeWear Selection"
        titleClass="ew-carousel-title--lg"
        sectionId="eyewear-products"
        backPath="/eyewear-fragrance"
        backLabel="Eyewear & Fragrance"
      />

<section className="eyewear-showcase mb-28" aria-label="Eyewear hero">
        <div className="fragrance-showcase-bg" />
        <div className="eyewear-showcase-text">
          <span className="hero-eyebrow">Collection 2024</span>
          <h1>Fragrance</h1>
        
          <a href="#eyewear-products" className="hero-btn">
            Explore cOLLECTION
          </a>
        </div>
      </section>


      {/* Fragrance editorial — Les Eaux */}
      <div className="ef-editorial-row">
        <div className="ef-editorial-img">
          <img
            src="https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1780588706283-vl-kem-summer-2026-les-eaux-3-dotcom-edito-push_2596x1948.jpg"
            alt="Les Eaux de Chanel"
          />
        </div>
        <div className="ef-editorial-body">
          <span className="eyebrow-label">Fragrance</span>
          <h2>Les Eaux de Chanel</h2>
          <p>
            Six scented getaways inspired by destinations that were close to
            Gabrielle Chanel&apos;s heart.
          </p>
          <a href="#fragrance-products" className="ef-discover-link">
            Discover
          </a>
        </div>
      </div>



      {/* Fragrance editorial — Chance */}
      <div className="ef-editorial-row ef-editorial-row--reverse">
        <div className="ef-editorial-img">
          <img
            src="https://www.chanel.com/puls-img/1782741509479-vl-kem-summer-2026-chance-dotcom-edito-push.jpg"
            alt="Chance Eau Splendide"
          />
        </div>
        <div className="ef-editorial-body">
          <span className="eyebrow-label">Fragrance</span>
          <h2>Chance Eau Splendide</h2>
          <p>
            A radiant and magnetic fruity-floral scent, blending a tart
            raspberry accord with a floral heart of rose geranium and a
            mysterious cedar-white musk accord.
          </p>
          <a href="#fragrance-products" className="ef-discover-link">
            Discover
          </a>
        </div>
      </div>

      {/* Fragrance products — carousel */}
      <ProductCarousel
        products={fragranceProducts}
        title="Fragrance Selection"
        titleClass="ew-carousel-title--lg"
        sectionId="fragrance-products"
        backPath="/eyewear-fragrance"
        backLabel="Eyewear & Fragrance"
      />


      <Footer />
    </>
  );
}
