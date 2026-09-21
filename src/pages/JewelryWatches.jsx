import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import HeroSection from "../components/form/HeroForm.jsx";
import HeroPicture from "../assets/jewerly-hero.png";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart";
import ProductCarousel from "../components/eyewear-fragrance/ProductCarousel";
import ChanelBoutiques from "../components/form/ChanelBoutiques.jsx";
function ProductCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  function goToDetail() {
    navigate("/product", {
      state: {
        product: {
          ...item,
          category: item.category || "Watches",
        },
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
    <div className="bg-white text-black">
      <Navbar />
      <section className="border-y border-gray-200 bg-white px-6 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gray-500">
              The Collection
            </p>

            <h2 className="text-3xl font-light tracking-wide md:text-4xl">
              Jewelry & Watches
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">
              Discover timeless creations inspired by the codes of the House,
              where craftsmanship and elegance meet. Each piece reflects a
              refined balance of heritage, innovation, and contemporary design,
              created to celebrate the enduring spirit of CHANEL.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 2 */}
            <div className="group">
              <div className="overflow-hidden bg-gray-100">
                <img
                  src="https://i.pinimg.com/736x/71/af/4e/71af4e99ab6561d5dfbf738adc75a756.jpg"
                  alt="Jewelry craftsmanship"
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                  Savoir-Faire
                </p>

                <h3 className="mt-2 text-xl font-light">
                  The art of craftsmanship
                </h3>

                <button className="mt-5 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:opacity-50">
                  Explore
                </button>
              </div>
            </div>
            {/* Card 1 */}
            <div className="group">
              <div className="overflow-hidden bg-gray-100">
                <img
                  src="https://i.pinimg.com/736x/d6/e2/2c/d6e22c7fbdfb4b3e135e91b7554812f9.jpg"
                  alt="Jewelry collection"
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                  Jewelry
                </p>

                <h3 className="mt-2 text-xl font-light">Timeless creations</h3>

                <button className="mt-5 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:opacity-50">
                  Discover
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="overflow-hidden bg-gray-100">
                <img
                  src="https://i.pinimg.com/736x/3c/81/b0/3c81b0fd00da8b3f178b673047e36dc4.jpg"
                  alt="CHANEL watches"
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                  Watches
                </p>

                <h3 className="mt-2 text-xl font-light">The art of time</h3>

                <button className="mt-5 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:opacity-50">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="watches" className="bg-white py-2 md:py-10">
        <EditorialCart
          src="https://i.pinimg.com/736x/3c/81/b0/3c81b0fd00da8b3f178b673047e36dc4.jpg"
          title="The Watch"
          type="Savoir-Faire"
          description="Every CHANEL watch piece is born in the ateliers of Paris, where a community of artisans, jewelers, setters, and polishers carry forward centuries of French craft tradition. Each creation is shaped with meticulous attention to detail, combining timeless elegance with contemporary design. From the finest materials to the smallest finishing touches, every element reflects CHANEL’s dedication to precision, artistry, and exceptional craftsmanship."
          reverse
        />

        <div className="mx-auto mb-8 max-w-6xl px-4 my-10 md:px-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-gray-500">
                Timepieces
              </p>

              <h2 className="text-4xl font-light tracking-wide md:text-4xl">
                Watches
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-5 text-gray-500">
              Precision, character and timeless elegance come together in
              creations designed to transcend time.
            </p>
          </div>
        </div>

        <ProductCarousel
          title=""
          sectionId="women-watches"
          backPath="/jewelry-watches"
          backLabel="Jewelry & Watches"
          apiUrl="https://dummyjson.com/products/category/womens-watches"
           viewMoreTo="/shop/jewelry-watches"
        />
      </section>

      <EditorialCart
        src="https://i.pinimg.com/736x/6e/76/d1/6e76d114ecf0926853bd4e5f2fea9a42.jpg"
        title="The Jewelry"
        type="Savoir-Faire"
        description="
  Precision, character and timeless elegance come together in creations designed
  to transcend time. Each piece reflects a commitment to exceptional craftsmanship,
  refined details and enduring style, created for those who appreciate beauty that
  never follows trends but defines them.
"
      />

      <section id="jewelry" className="bg-white">
        <div className="mx-auto mb-8 max-w-6xl px-4 md:px-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-gray-500">
                Timepieces
              </p>

              <h2 className="text-4xl font-light tracking-wide md:text-4xl">
                Jewelry
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-5 text-gray-500">
              Precision, character and timeless elegance come together in
              creations designed to transcend time.
            </p>
          </div>
        </div>

        <ProductCarousel
          className="!mt-0"
          title=""
          sectionId="women-jewelry"
          backPath="/jewelry-watches"
          backLabel="Jewelry & Watches"
          apiUrl="https://dummyjson.com/products/category/womens-jewellery"
             viewMoreTo="/shop/jewelry-watches"
        />
      </section>

      <ChanelBoutiques />

      <Footer />
    </div>
  );
}
