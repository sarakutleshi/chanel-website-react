import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // If someone navigates here directly without state, go home
  if (!state?.product) {
    return (
      <>
        <Navbar />
        <div className="pd-not-found">
          <h2>Product not found.</h2>
          <Link to="/" className="pd-back-link">← Return Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  const { product, backPath, backLabel } = state;

  function handleAddToCart() {
    addToCart({
      id: product.name.toLowerCase().replace(/\s+/g, '-'),
      name: product.name,
      img: product.img,
      price: product.price,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <button onClick={() => navigate(backPath || -1)} className="pd-back">
          ← {backLabel || 'Back'}
        </button>
        <span className="pd-breadcrumb-sep">/</span>
        <span className="pd-breadcrumb-current">{product.name}</span>
      </div>

      {/* Main content */}
      <section className="pd-layout">
        {/* Image */}
        <div className="pd-image-col">
          <div className="pd-image-wrap">
            <img src={product.img} alt={product.name} />
          </div>
        </div>

        {/* Info */}
        <div className="pd-info-col">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-divider" />

          <p className="pd-desc">{product.desc}</p>

          <div className="pd-divider" />

          <span className="pd-price">{product.price}</span>

          <div className="pd-actions">
            <button
              className={`pd-btn-cart ${added ? 'pd-btn-cart--added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link to="/cart" className="pd-btn-view-cart">
              View Cart
            </Link>
          </div>

          {/* Features */}
          <div className="pd-features">
            <div className="pd-feature">
              <span className="pd-feature-icon">◇</span>
              <span>Complimentary shipping on all orders</span>
            </div>
            <div className="pd-feature">
              <span className="pd-feature-icon">◇</span>
              <span>Gift wrapping available at checkout</span>
            </div>
            <div className="pd-feature">
              <span className="pd-feature-icon">◇</span>
              <span>Returns within 30 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial strip */}
      <div className="pd-editorial">
        <div className="pd-editorial-inner">
          <span className="eyebrow-label">The CHANEL Promise</span>
          <h2>Crafted for Those Who Appreciate the Exceptional</h2>
          <p>
            Every CHANEL product is conceived in Paris and brought to life by a community of artisans
            who have dedicated their craft to the House&apos;s exacting standards. From first sketch
            to final finish, each piece reflects a legacy of excellence that has defined luxury for
            over a century.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
