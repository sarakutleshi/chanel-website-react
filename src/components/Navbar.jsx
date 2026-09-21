import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const collections = [
  { name: "Fashion", path: "/fashion" },
  { name: "Makeup & Skincare", path: "/makeup-skincare" },
  { name: "Jewelry & Watches", path: "/jewelry-watches" },
  { name: "Eyewear & Fragrance", path: "/eyewear-fragrance" },
  { name: "Galerie", path: "/galerie" },
];

export default function Navbar() {
  const { totalCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCollectionsOpen && !isProfileOpen) return;

    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-navbar-dropdown]")) {
        setIsCollectionsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isCollectionsOpen, isProfileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsCollectionsOpen(false);
      setIsProfileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsCollectionsOpen(false);
    setIsMobileCollectionsOpen(false);
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    navigate("/");
  };

  const closeMenus = () => {
    setIsCollectionsOpen(false);
    setIsMobileCollectionsOpen(false);
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  };

  const handleLogoClick = () => {
    closeMenus();
    navigate(isLoggedIn ? "/home" : "/");
  };

  const linkClass =
    "text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-800 transition-opacity duration-200 hover:opacity-45";

  const dropdownPanel =
    "absolute top-[calc(100%+14px)] z-50 min-w-[220px] border border-neutral-200 bg-white py-2 shadow-none";

  const dropdownItem =
    "block px-5 py-3 text-[11px] tracking-[0.02em] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center px-5 md:h-16 md:px-8 lg:px-10">
        <button
          type="button"
          onClick={handleLogoClick}
          className="shrink-0"
          aria-label="CHANEL home"
        >
          <span className="font-serif text-[20px] font-medium tracking-[0.38em] text-neutral-950 md:text-[22px]">
            CHANEL
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {isLoggedIn && (
            <div className="relative" data-navbar-dropdown>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollectionsOpen((open) => !open);
                  setIsProfileOpen(false);
                }}
                className={`${linkClass} inline-flex items-center gap-1.5`}
              >
                Collections
                <svg
                  className={`h-2.5 w-2.5 transition-transform duration-300 ${
                    isCollectionsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {isCollectionsOpen && (
                <div className={`${dropdownPanel} right-0`}>
                  {collections.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className={dropdownItem}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          <NavLink to="/about" onClick={closeMenus} className={linkClass}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenus} className={linkClass}>
            Contact
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/shop" onClick={closeMenus} className={linkClass}>
              Shop
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink
              to="/cart"
              onClick={closeMenus}
              className="relative text-neutral-800 transition-opacity hover:opacity-45"
              aria-label={`Cart, ${totalCount} items`}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-3.5 min-w-3.5 items-center justify-center bg-black px-1 text-[8px] text-white">
                  {totalCount}
                </span>
              )}
            </NavLink>
          )}

          <div className="relative" data-navbar-dropdown>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileOpen((open) => !open);
                setIsCollectionsOpen(false);
              }}
              className={`${linkClass} inline-flex items-center gap-1.5`}
              aria-label="Profile"
            >
              Profile
              <svg
                className={`h-2.5 w-2.5 transition-transform duration-300 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className={`${dropdownPanel} right-0`}>
                {!isLoggedIn && (
                  <>
                    <NavLink
                      to="/signin"
                      onClick={closeMenus}
                      className={dropdownItem}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={closeMenus}
                      className={dropdownItem}
                    >
                      Create Account
                    </NavLink>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={closeMenus}
                      className={dropdownItem}
                    >
                      My Profile
                    </NavLink>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`${dropdownItem} w-full text-left`}
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsMobileOpen((open) => !open);
            setIsMobileCollectionsOpen(false);
            setIsCollectionsOpen(false);
            setIsProfileOpen(false);
          }}
          className="ml-auto flex h-8 w-8 items-center justify-center text-neutral-900 lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-neutral-200 transition-all duration-300 ease-out lg:hidden ${
          isMobileOpen ? "max-h-[800px]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="bg-white px-6 pb-8 pt-2">
          {isLoggedIn && (
            <div className="border-b border-neutral-100">
              <button
                type="button"
                onClick={() => setIsMobileCollectionsOpen((open) => !open)}
                aria-expanded={isMobileCollectionsOpen}
                className="flex w-full items-center justify-between py-3.5 text-[10px] font-medium uppercase tracking-[0.22em]"
              >
                Collections
                <svg
                  className={`h-2.5 w-2.5 transition-transform duration-300 ${
                    isMobileCollectionsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {isMobileCollectionsOpen && (
                <div className="pb-3 pl-3">
                  {collections.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="block py-2.5 text-[12px] text-neutral-600"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="border-b border-neutral-100 py-1">
            <NavLink
              to="/about"
              onClick={closeMenus}
              className="block py-3.5 text-[10px] font-medium uppercase tracking-[0.22em]"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenus}
              className="block py-3.5 text-[10px] font-medium uppercase tracking-[0.22em]"
            >
              Contact
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/shop"
                  onClick={closeMenus}
                  className="block py-3.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={closeMenus}
                  className="flex items-center gap-2.5 py-3.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                >
                  Cart
                  {totalCount > 0 && (
                    <span className="flex h-3.5 min-w-3.5 items-center justify-center bg-black px-1 text-[8px] text-white">
                      {totalCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}
          </div>

          <div className="pt-5">
            <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-neutral-400">
              Account
            </p>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/signin"
                  onClick={closeMenus}
                  className="block py-2.5 text-[10px] uppercase tracking-[0.2em]"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenus}
                  className="block py-2.5 text-[10px] uppercase tracking-[0.2em]"
                >
                  Create Account
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMenus}
                  className="block py-2.5 text-[10px] uppercase tracking-[0.2em]"
                >
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block py-2.5 text-left text-[10px] uppercase tracking-[0.2em]"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
