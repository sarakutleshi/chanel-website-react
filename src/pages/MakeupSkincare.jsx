import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MakeupSkincare.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const philosophyItems = [
  {
    icon: "✦",
    title: "Precision",
    desc: "Every formula is the result of years of research, tested to perfection before it meets your skin.",
  },
  {
    icon: "✦",
    title: "Sensoriality",
    desc: "Textures that melt, scents that linger — beauty that engages every sense, not just sight.",
  },
  {
    icon: "✦",
    title: "Longevity",
    desc: "From morning light to the last dance of the evening — color and care that endures.",
  },
  {
    icon: "✦",
    title: "Artistry",
    desc: "Inspired by the ateliers of Paris, each product is a gesture of craftsmanship in the palm of your hand.",
  },
];

const carouselItems = [
  {
    bg: "https://i.pinimg.com/vwebp/1200x/1e/ae/38/1eae3857f62927904f858876f3f3f7d2.webp",
    title: "Rouge Allure Velvet",
    sub: "Luminous Matte Lip Colour",
  },
  {
    bg: "https://i.pinimg.com/736x/40/4c/9b/404c9bc881baf648cbf705732dd42dbb.jpg",
    title: "Les Beiges",
    sub: "Healthy Glow Foundation",
  },
  {
    bg: "https://i.pinimg.com/736x/76/67/b0/7667b0674997a6cb843745496b733f3c.jpg",
    title: "Stylo Yeux",
    sub: "Waterproof Long-Lasting Eye Liner",
  },
  {
    bg: "https://i.pinimg.com/736x/bd/57/5f/bd575f62c5b74237d91f9f25003a0121.jpg",
    title: "Inimitable Mascara",
    sub: "Multi-Dimensional Volume",
  },
  {
    bg: "https://i.pinimg.com/vwebp/1200x/47/41/5e/47415e050d2225d368a3716a28dbb25c.webp",
    title: "Joues Contraste",
    sub: "Powder Blush",
  },
  {
    bg: "https://i.pinimg.com/vwebp/1200x/b2/32/06/b232066cdb134dd94f7557b570964d50.webp",
    title: "Ombre Première",
    sub: "Longwear Powder Eyeshadow",
  },
];

const makeupProducts = [
  {
    img: "https://i.pinimg.com/736x/62/53/84/62538407aa186cb2820528b20df07d57.jpg",
    category: "Lips",
    name: "Rouge Allure Velvet",
    desc: "Luminous matte lip colour — a velvety texture that wraps lips in intense colour and comfort.",
    price: "$42",
  },
  {
    img: "https://i.pinimg.com/736x/c8/a9/75/c8a975da6bef11dfa4a4d1d1fffa06f1.jpg",
    category: "Face",
    name: "Les Beiges Foundation",
    desc: "A healthy glow foundation that perfects skin while maintaining a natural, luminous look.",
    price: "$65",
  },
  {
    img: "https://i.pinimg.com/1200x/61/7a/23/617a237167babc57682eefe399fbbfed.jpg",
    category: "Eyes",
    name: "Le Volume de Chanel",
    desc: "A volumising mascara that builds intense, structured lashes with a dramatic curved brush.",
    price: "$38",
  },
  {
    img: "https://i.pinimg.com/736x/76/67/b0/7667b0674997a6cb843745496b733f3c.jpg",
    category: "Cheeks",
    name: "Joues Contraste",
    desc: "A powder blush that sculpts and enhances the complexion with a silky, buildable pigment.",
    price: "$55",
  },
  {
    img: "https://i.pinimg.com/736x/69/8f/5f/698f5f544f0f7db94f7fe958d43331a4.jpg",
    category: "Eyes",
    name: "Ombre Première",
    desc: "Long-wear powder eyeshadow for a sophisticated, multi-dimensional eye look.",
    price: "$40",
  },
  {
    img: "https://i.pinimg.com/736x/27/60/8a/27608ad5f46e3c640b5e523a4672002b.jpg",
    category: "Lips",
    name: "Rouge Coco Flash",
    desc: "Colour, shine and intensity in a flash — a lightweight lip colour with a glossy finish.",
    price: "$40",
  },
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

function MakeupCard({ item, section }) {
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
      className="makeup-card"
      onClick={goToDetail}
      style={{ cursor: "pointer" }}
    >
      <div className="makeup-img-wrap">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="makeup-info">
        <span className="makeup-category">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <span className="makeup-price">{item.price}</span>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
}

export default function MakeupSkincare() {
  const cardsRef = useRef(null);

  const scrollCards = (direction) => {
    if (cardsRef.current) {
      const cardWidth =
        cardsRef.current.querySelector(".carousel-card")?.offsetWidth || 0;
      cardsRef.current.scrollLeft += direction * (cardWidth + 25);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Split */}
      <div className="makeup-content-container">
        <div className="makeup-show-case">
          <h1>Make-Up</h1>
          <h2>
            Express. Enhance. Empower.
            <br />
            The power of Make-up
          </h2>
          <h2>
            Unleash your inner artist, from subtle enhancements to bold
            statements, discover the confidence that comes with every stroke of
            color.
          </h2>
          <a href="#makeup-products">Shop Products</a>
        </div>
        <div className="makeup-image">
          <img
            src="https://i.pinimg.com/736x/73/da/34/73da343b96cee6c62068d43ac93ee0fa.jpg"
            alt="Makeup promotional"
          />
        </div>
      </div>

      {/* Philosophy */}
      <div className="section-label">
        <h2>The CHANEL Beauty Philosophy</h2>
      </div>
      <div className="philosophy-band">
        {philosophyItems.map((item, i) => (
          <>
            {i > 0 && <div className="philosophy-divider" key={`div-${i}`} />}
            <div className="philosophy-item" key={i}>
              <span className="philosophy-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </>
        ))}
      </div>

      {/* Carousel */}
      <div className="section-label" id="makeup-products">
        <h2>Makeup Selection</h2>
      </div>
      <div className="cards-wrapper">
        <button
          className="arrow-btn"
          onClick={() => scrollCards(-1)}
          aria-label="Scroll left"
        >
          &#10094;
        </button>
        <div className="home-cards" ref={cardsRef}>
          {carouselItems.map((item, i) => (
            <div
              className="carousel-card"
              key={i}
              style={{ backgroundImage: `url(${item.bg})` }}
            >
              <div className="card-overlay">
                <h3>{item.title}</h3>
                <p className="card-sub">{item.sub}</p>
                <a href="#">Discover</a>
              </div>
            </div>
          ))}
        </div>
        <button
          className="arrow-btn"
          onClick={() => scrollCards(1)}
          aria-label="Scroll right"
        >
          &#10095;
        </button>
      </div>

      {/* Makeup Products */}
      <div className="makeup-grid">
        {makeupProducts.map((item, i) => (
          <MakeupCard item={item} key={i} />
        ))}
      </div>

      {/* Skincare */}
      <div className="section-label">
        <h2>Skincare</h2>
      </div>
      <div className="skincare-hero">
        <div className="skincare-hero-img">
          <img
            src="https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp"
            alt="Chanel Skincare"
          />
        </div>
        <div className="skincare-hero-text">
          <span className="eyebrow-label">Le Lift</span>
          <h2>Discover the Beauty Within</h2>
          <p>
            CHANEL skincare is rooted in the science of the camomille de Grasse
            — a flower cultivated exclusively for the House since 1987. Its
            remarkable properties inspire every formula in the skincare line,
            from targeted serums to deeply nourishing creams.
          </p>
          <p style={{ marginTop: "1.25rem" }}>
            The LE LIFT range harnesses the anti-aging power of a concentrated
            active ingredient derived from alfalfa, visibly firming and
            smoothing the skin with each application.
          </p>
          <a href="#skincare-products" className="text-link">
            Explore Skincare →
          </a>
        </div>
      </div>

      {/* Skincare Products */}
      <div
        className="makeup-grid"
        id="skincare-products"
        style={{ marginTop: 0 }}
      >
        {skincareProducts.map((item, i) => (
          <MakeupCard item={item} key={i} />
        ))}
      </div>

      {/* Ritual Banner */}
      <div className="ritual-banner">
        <div className="ritual-banner-inner">
          <h2>
            &quot;Beauty begins the moment you decide to be yourself.&quot;
          </h2>
          <p>— Gabrielle Chanel</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
