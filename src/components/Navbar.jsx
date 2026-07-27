import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalCount } = useCart();

  return (
    <nav className="header" aria-label="Primary navigation">
      <div className="container-fluid">
        <div className="nav-links">
          <NavLink className="navbar-brand" to="/fashion">
            Fashion
          </NavLink>
          <NavLink className="navbar-brand" to="/makeup-skincare">
            Makeup &amp; Skincare
          </NavLink>
          <NavLink className="navbar-brand" to="/jewelry-watches">
            Jewelry &amp; Watches
          </NavLink>
        </div>

        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1>CHANEL</h1>
        </NavLink>

        <div className="nav-links">
          <NavLink className="navbar-brand" to="/eyewear-fragrance">
            Eyewear &amp; Fragrance
          </NavLink>
          <NavLink className="navbar-brand" to="/about">
            About Chanel
          </NavLink>
          <NavLink
            className="navbar-cart"
            to="/cart"
            aria-label={`Cart, ${totalCount} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
