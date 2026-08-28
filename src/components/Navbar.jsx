import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="relative sticky top-0 z-50  bg-white"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left Links (Desktop) */}
        <div className="hidden items-center gap-8 lg:flex">
          <NavLink className="navbar-brand" to="/fashion">
            Fashion
          </NavLink>

          <NavLink className="navbar-brand" to="/makeup-skincare">
            Makeup &amp; Skincare
          </NavLink>

          <NavLink className="navbar-brand" to="/jewelry-watches">
            Jewelry &amp; Watches
          </NavLink>
          <NavLink className="navbar-brand" to="/galerie">
            Galerie
          </NavLink>
        </div>

        {/* Logo */}
        <NavLink to="/" className="z-20 no-underline">
          <h1 className="text-3xl font-semibold tracking-[0.35em]">CHANEL</h1>
        </NavLink>

        {/* Right Links (Desktop) */}
        <div className="hidden items-center gap-8 lg:flex">
          <NavLink className="navbar-brand" to="/eyewear-fragrance">
            Eyewear &amp; Fragrance
          </NavLink>

          <NavLink className="navbar-brand" to="/about">
            About Chanel
          </NavLink>

          <NavLink className="navbar-brand" to="/contact">
            Contact Us
          </NavLink>

          <NavLink
            className="relative flex items-center"
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
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {totalCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {totalCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="z-20 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[600px] border-t" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 bg-white px-6 py-8">
          <NavLink onClick={() => setIsOpen(false)} to="/fashion">
            Fashion
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/makeup-skincare">
            Makeup &amp; Skincare
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/jewelry-watches">
            Jewelry &amp; Watches
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/galerie">
            Galerie
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/eyewear-fragrance">
            Eyewear &amp; Fragrance
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/about">
            About Chanel
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(false)}
            className="relative flex items-center"
            to="/cart"
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
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {totalCount > 0 && (
              <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {totalCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
