import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import HeroSection from "../components/HeroSection";
import HeroPicture from "../assets/jewerly-hero.png";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart";
import ProductCarousel from "../components/eyewear-fragrance/ProductCarousel";
import Highlights from "../components/Highlights.jsx";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", {
      state: {
        product: { ...item, category: item.category || "Watches" },
        backPath: "/jewelry-watches",
        backLabel: "Jewelry & Watches",
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
      category: item.category || "Watches",
      desc: item.desc,
    });
  }

  return (
    <article
      className="jw-product-card"
      onClick={goToDetail}
      style={{ cursor: "pointer" }}
    >
      <img src={item.img} alt={item.name} />
      <div className="jw-product-info">
        <span className="jw-product-category">
          {item.category || "Watches"}
        </span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="jw-product-price">{item.price}</span>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </article>
  );
}

export default function JewelryWatches() {
  return (
    <>
      <Navbar />

      <HeroSection src={HeroPicture} />

      <div className="m-[20px] font-serif italic text-[1.5rem] leading-[1.4] text-[var(--ink)] mx-auto  text-center mt-[3rem] mb-[3rem] max-w-[var(--max)]">
        <p>Discover the entire universe of CHANEL Watches</p>
      </div>
      <ProductCarousel
        title="Watches"
        sectionId="jewelry"
        backPath="/"
        backLabel="Back"
        apiUrl="https://dummyjson.com/products/category/womens-watches"
      />

      <EditorialCart
        src="https://i.pinimg.com/736x/6e/76/d1/6e76d114ecf0926853bd4e5f2fea9a42.jpg"
        title="The Craft"
        type="Savoir-Faire"
        description="Every CHANEL jewelry piece is born in the ateliers of Paris, where a community of artisans jewelers, setters, 
        polishers carry forward centuries of French craft tradition."
      />

      <ProductCarousel
        title="Jewelry"
        sectionId="women-jewelry"
        backPath="/"
        backLabel="Back"
        apiUrl="https://dummyjson.com/products/category/womens-jewellery"
      />
      <Footer />
    </>
  );
}
