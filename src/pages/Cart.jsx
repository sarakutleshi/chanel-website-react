import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  function handleFinalizeOrder() {
    setOrdered(true);
    clearCart();
  }

  /* ── Order confirmation screen ── */
  if (ordered) {
    return (
      <>
        <Navbar />
        <div className="cart-confirm">
          <div className="cart-confirm-inner">
            <div className="cart-confirm-icon">✓</div>
            <span className="eyebrow-label">Order Confirmed</span>
            <h1>Thank you for your order</h1>
            <p>
              Your CHANEL order has been received. A confirmation will be sent
              to your email shortly. Our team will contact you within 24 hours
              to arrange delivery.
            </p>
            <Link to="/" className="cart-confirm-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <div className="cart-empty-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Discover our collections and add your favourites.</p>
            <Link to="/" className="cart-empty-btn">Explore Collections</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Cart with items ── */
  return (
    <>
      <Navbar />

      <div className="cart-page">
        {/* Header */}
        <div className="section-label">
          <h2>Your Selection</h2>
        </div>

        <div className="cart-layout">
          {/* Items list */}
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link
                  to="/product"
                  state={{ product: item, backPath: '/cart', backLabel: 'Cart' }}
                  className="cart-item-img-link"
                >
                  <div className="cart-item-img">
                    <img src={item.img} alt={item.name} />
                  </div>
                </Link>

                <div className="cart-item-info">
                  <span className="cart-item-category">{item.category}</span>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <span className="cart-item-price">{item.price}</span>

                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>
              </article>
            ))}
          </div>

          {/* Order summary */}
          <aside className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-rows">
              {items.map((item) => {
                const numeric = parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
                const line = isNaN(numeric) ? item.price : `$${(numeric * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                return (
                  <div className="cart-summary-row" key={item.id}>
                    <span className="cart-summary-label">
                      {item.name}
                      {item.qty > 1 && <em> × {item.qty}</em>}
                    </span>
                    <span className="cart-summary-value">{line}</span>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span>Total</span>
              <span>
                ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="cart-summary-note">
              Taxes and shipping calculated at checkout. Complimentary delivery on all orders.
            </div>

            <button className="cart-finalize-btn" onClick={handleFinalizeOrder}>
              Finalise Order
            </button>

            <Link to="/" className="cart-continue-link">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
