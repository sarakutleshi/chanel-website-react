import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  {
    to: "/fashion",
    label: "Fashion",
    img: "https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/FSH-1698766793807-03image.jpg",
  },
  {
    to: "/makeup-skincare",
    label: "Makeup & Skincare",
    img: "https://i.pinimg.com/736x/73/da/34/73da343b96cee6c62068d43ac93ee0fa.jpg",
  },
  {
    to: "/jewelry-watches",
    label: "Jewelry & Watches",
    img: "https://i.pinimg.com/736x/71/1c/5b/711c5b65d016faafe69ca6aff293f87f.jpg",
  },
  {
    to: "/eyewear-fragrance",
    label: "Eyewear & Fragrance",
    img: "https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/FSH-1703088359624-05blocdesktop.jpg",
  },
  {
    to: "/about",
    label: "About Chanel",
    img: "https://i.pinimg.com/736x/65/52/8e/65528e4333be803cc97833893035cc54.jpg",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1>CHANEL</h1>
          <p>The art of being unique</p>
          <Link to="/fashion">Explore Collections</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="category-section">
        <h2>Our World</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={cat.to} className="category-card" key={cat.to}>
              <img src={cat.img} alt={cat.label} />
              <span className="category-card-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tagline */}
      <div className="home-tagline">
        <blockquote>&quot;Fashion fades, only style remains the same.&quot;</blockquote>
        <p>— Gabrielle Chanel</p>
      </div>

      <Footer />
    </>
  );
}
