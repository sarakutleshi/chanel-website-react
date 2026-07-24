import './JewelryWatches.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const watches = [
  { img: "https://i.pinimg.com/736x/e7/b6/a6/e7b6a65a070f94084e8dbaa76b7ec666.jpg", name: "CODE COCO WATCH", desc: "Steel · Case size 38.1 × 21.5 × 7.8 mm · One size", price: "$5,450" },
  { img: "https://i.pinimg.com/736x/16/a2/80/16a280633a3ed93de28c8c962ff10c3f.jpg", name: "PREMIÈRE GOURMETTE CHAIN WATCH", desc: "Diamonds, black-lacquered dial · Case size 26.1 × 20 × 7.6 mm", price: "$4,750" },
  { img: "https://i.pinimg.com/736x/53/0a/85/530a8581859b85697486bddcd9417fd7.jpg", name: "PREMIÈRE CERAMIC WATCH", desc: "Steel and ceramic, diamonds · Case size 19.7 × 15.2 × 7.8 mm", price: "$8,100" },
  { img: "https://i.pinimg.com/736x/a2/61/47/a26147530cdc4f56d2ff7beec1230150.jpg", name: "J12·XS WATCH", desc: "White ceramic and steel · Case size 19 × 7.66 mm", price: "$8,200" },
];

const jewelry = [
  { img: "https://i.pinimg.com/736x/1d/04/43/1d0443fee3595604ac4efa1e197174c7.jpg", category: "Fine Jewelry", name: "ÉTOILE FILANTE NECKLACE", desc: "18K white gold, diamonds", price: "$6,200" },
  { img: "https://i.pinimg.com/736x/f1/4b/c0/f14bc0880c8d0b946d4b8ba0cddb8005.jpg", category: "Fine Jewelry", name: "EXTRAIT DE CAMÉLIA HOOP EARRINGS", desc: "18K pink gold, diamonds", price: "$7,100" },
  { img: "https://i.pinimg.com/736x/07/aa/f5/07aaf5d3d5d6b2170e38a7f3b56ff932.jpg", category: "Fine Jewelry", name: "COCO CRUSH RING", desc: "Quilted motif, small · 18K white gold", price: "$3,000" },
  { img: "https://i.pinimg.com/736x/16/6f/e2/166fe21a614b03cdab759c474c25fd41.jpg", category: "Fine Jewelry", name: "BOUTON DE CAMÉLIA RING", desc: "18K yellow gold, diamonds", price: "$16,050" },
];

const careItems = [
  { icon: "◇", title: "Storage", desc: "Store each piece individually in its original pouch or a soft-lined box to prevent scratching. Keep away from direct sunlight and humidity." },
  { icon: "◇", title: "Cleaning", desc: "Gently wipe gold and platinum pieces with a soft, lint-free cloth. For diamonds, use a mild soap solution and rinse thoroughly with warm water." },
  { icon: "◇", title: "Wearing", desc: "Remove jewelry before exercising, swimming or applying perfume and cosmetics. Put on your jewelry as the last step of your getting ready routine." },
  { icon: "◇", title: "Servicing", desc: "We recommend bringing your CHANEL jewelry and watches to a boutique for professional cleaning and inspection every two years." },
];

function ProductCard({ item }) {
  return (
    <article className="jw-product-card">
      <img src={item.img} alt={item.name} />
      <div className="jw-product-info">
        <span className="jw-product-category">{item.category || "Watches"}</span>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <span className="jw-product-price">{item.price}</span>
        <button onClick={() => alert('Added to CART!')}>Add to Cart</button>
      </div>
    </article>
  );
}

export default function JewelryWatches() {
  return (
    <>
      <Navbar />

      {/* Hero Gallery */}
      <section className="hero-gallery" aria-label="Jewelry and Watches hero">
        <img src="https://i.pinimg.com/736x/40/b9/c9/40b9c9b52bfc89be2b4c1b773a27ff37.jpg" alt="Chanel Watch" />
        <img src="https://i.pinimg.com/736x/71/1c/5b/711c5b65d016faafe69ca6aff293f87f.jpg" alt="Chanel Jewelry" />
        <img src="https://i.pinimg.com/736x/56/2d/2c/562d2c39369e520d8d5857868308bec6.jpg" alt="Chanel Fine Jewelry" />
      </section>

      {/* Intro */}
      <div className="jw-editorial-intro">
        <p>Discover the entire universe of CHANEL Watches — pieces for men and women reflecting the creativity and expertise of the House.</p>
        <p>CHANEL High Jewelry embodies the traditional French savoir-faire process. Each piece is made entirely by hand, from the initial design sketch to the construction and creation by the craftspeople in the atelier.</p>
      </div>

      {/* Watches */}
      <div className="section-label"><h2>Watches</h2></div>
      <div className="jw-product-grid">
        {watches.map((item, i) => <ProductCard item={item} key={i} />)}
      </div>

      {/* The Craft */}
      <div className="section-label"><h2>The Craft</h2></div>
      <div className="savoir-split">
        <div className="savoir-img">
          <img src="https://i.pinimg.com/736x/71/1c/5b/711c5b65d016faafe69ca6aff293f87f.jpg" alt="Chanel atelier craft" />
        </div>
        <div className="savoir-text">
          <span className="eyebrow-label">Savoir-Faire</span>
          <h2>Made by Hand, Born of Tradition</h2>
          <p>Every CHANEL jewelry piece is born in the ateliers of Paris, where a community of artisans — jewelers, setters, polishers — carry forward centuries of French craft tradition.</p>
          <p style={{ marginTop: '1.25rem' }}>The process begins with a sketch. From concept to creation, each piece passes through dozens of pairs of skilled hands, each contributing a layer of precision and care that cannot be replicated by machine.</p>
          <p style={{ marginTop: '1.25rem' }}>This commitment to handcraft is what makes every CHANEL jewel not just an accessory, but an object of lasting significance — a piece to be worn, admired, and passed down.</p>
          <div className="savoir-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Artisan steps per piece</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6 months</span>
              <span className="stat-label">Average creation time, High Jewelry</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Since 1932</span>
              <span className="stat-label">Bijoux de Diamants, first collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jewelry */}
      <div className="section-label"><h2>Jewelry</h2></div>
      <div className="jw-product-grid">
        {jewelry.map((item, i) => <ProductCard item={item} key={i} />)}
      </div>

      {/* Care Guide */}
      <div className="section-label"><h2>Care Guide</h2></div>
      <div className="care-grid">
        {careItems.map((item, i) => (
          <div className="care-card" key={i}>
            <span className="care-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
