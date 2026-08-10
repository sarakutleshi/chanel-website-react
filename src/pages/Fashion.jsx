import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import EyewearHighlights from "../components/Highlights.jsx";
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
    <div
      className="grid grid-cols-4 max-[1024pxpx]:grid-cols-2 max-[640pxpx]:grid-cols-1 gap-[1.5rem] m-w-[var(--max)] mx-auto my-auto p-[0_var(--pad)_5rem]"
      style={noPaddingTop ? { paddingTop: 0 } : {}}
    >
      {items.map((item, i) => (
        <div className="realtive overflow-hidden bg-[var(--off)]" key={i}>
          <img
            className="w-full h-[420px] object-cover transition-transform duration-500 hover:scale-104"
            src={item.src}
            alt={item.label}
          />
          <div className="p-[0.75rem_0.5rem_1rem]">
            <span className="font-[var(--sans)] text-[0.72rem] tracking-[0.12em] uppercase color-[var(--muted)]">
              {item.label}
            </span>
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
      <div className="relative overflow-hidden bg-[var(--off)]">
        <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-104" src={item.img} alt={item.name} />
        {item.tag && <span className="absolute top-[1rem] left-[1rem] bg-[var(--ink)] text-[var(--white)] text-[0.6rem] 
        font-semibold tracking-[0.14em] uppercase p-[0.3rem_0.7rem]">{item.tag}</span>}
      </div>
      <div className="p-[1.25rem_1.1rem_1.5rem]">
        <span className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase color-[var(--muted)]">
          {item.category}
        </span>
        <h3 className="text-xl font-semibold uppercase">{item.name}</h3>
        <p>{item.desc}</p>
        <span className="block text-[0.9rem] text-semibold text-[var(--ink)] mt-[1rem]">
          {item.price}
        </span>
        <button className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-wide transition-all hover:opacity-100" onClick={handleAddToCart}>
          {item.btn}
        </button>
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
      <div className="m-w-[720px] mx-0 my-auto p-[0_var(--pad)_4rem] text-center ">
        <p className="font-serif italic text-[1.5rem] leading-[1.4] text-[var(--muted)] ">
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
      <div className="grid grid-cols-3 max-[1024pxpx]:grid-cols-2 max-[640pxpx]:grid-cols-1 gap-[1.5rem] h-full mx-0 my-auto p-[0_var(--pad)_5rem]">
        {fashionDetails.map((src, i) => (
          <div className="look-card" key={i}>
            <img className="w-full" src={src} alt={`Detail ${i + 1}`} />
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
      <div className="grid grid-cols-3 max-[1024pxpx]:grid-cols-2 max-[640pxpx]:grid-cols-1
       gap-[2rem] h-full mx-0 my-auto p-[0_var(--pad)_5rem]">
        {fashionShopItems.map((item, i) => (
          <ShopCard item={item} key={i} />
        ))}
      </div>

      <ChanelBoutiques />

      <Footer />
    </>
  );
}
