import { useNavigate } from "react-router-dom";
import "./Fashion.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import EyewearHighlights from "../components/eyewear-fragrance/EyewearHighlights";
import fashionShopItems from "../data/fashion-shop-items";
import fashionLooks from "../data/fashion-looks";
import fashionDetails from "../data/fashion-details";
import HeroSection from "../components/HeroSection";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart.jsx";
import ChanelBoutiques from "../components/ChanelBoutiques.jsx";

const looks1 = fashionLooks.slice(0, 4);
const looks2 = fashionLooks.slice(4);

function LookGrid({ items, noPaddingTop = false }) {
  return (
    <div className="look-grid" style={noPaddingTop ? { paddingTop: 0 } : {}}>
      {items.map((item, i) => (
        <div className="look-card" key={i}>
          <img src={item.src} alt={item.label} />
          <div className="look-caption">
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShopCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", {
      state: { product: item, backPath: "/fashion", backLabel: "Fashion" },
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
      className="shop-card"
      onClick={goToDetail}
      style={{ cursor: "pointer" }}
    >
      <div className="shop-img-wrap">
        <img src={item.img} alt={item.name} />
        {item.tag && <span className="shop-tag">{item.tag}</span>}
      </div>
      <div className="shop-info">
        <span className="shop-category">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <span className="shop-price">{item.price}</span>
        <button onClick={handleAddToCart}>{item.btn}</button>
      </div>
    </article>
  );
}

export default function Fashion() {
  return (
    <>
      <Navbar />

      <HeroSection
        src="https://i.pinimg.com/originals/16/fb/da/16fbdad03c89a9c7707c8637d8594769.gif"
        uppertitle="Haute Couture"
        title="Fall–Winter"
        description="2024 / 25"
        href="/fashion"
        buttonText="Explore the Collection"
      />

      <EditorialCart
        src="https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg"
        type="The Venue"
        title="The Grand Palais Éphémère"
        description="The Grand Palais Éphémère was completely done up in tweed for
            today's Chanel show: an earthy light brown for the seats, black
            with shots of pop colors on the walls, and a pale green for the
            runway — designed to represent Scotland's River Tweed.
            The region was ground well-trod by Gabrielle Chanel; on her walks in
            the local countryside she gathered flowers and greenery as
            references for the colors she wanted from the fabric makers there.
        
            Tweed, a fabric born of Scottish landscapes, became one of
            Chanel's most beloved materials — reimagined season after
            season into something at once rooted in tradition and boldly
            contemporary."
      />

      <EyewearHighlights />

      {/* Looks */}
      <div className="section-label" id="looks">
        <h2>Looks</h2>
      </div>
      <div className="editorial-intro">
        <p>
          The CHANEL Fall-Winter 2024/25 Haute Couture collection by Virginie
          Viard comes to life in graphic silhouettes nuanced with precious
          tweeds and sophisticated embellishment.
        </p>
      </div>

      <LookGrid items={looks1} />
      <LookGrid items={looks2} noPaddingTop />

      {/* Details */}
      <div className="section-label">
        <h2>Details</h2>
      </div>
      <div className="details-grid">
        {fashionDetails.map((src, i) => (
          <div className="look-card" key={i}>
            <img src={src} alt={`Detail ${i + 1}`} />
            <div className="look-caption">
              <span>Detail {i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Shop the Collection */}
      <div className="section-label">
        <h2>Shop the Collection</h2>
      </div>
      <div className="shop-grid">
        {fashionShopItems.map((item, i) => (
          <ShopCard item={item} key={i} />
        ))}
      </div>

      <ChanelBoutiques />

      <Footer />
    </>
  );
}
