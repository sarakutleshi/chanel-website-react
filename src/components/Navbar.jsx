import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();

  const collections = [
    { name: "Fashion", path: "/fashion" },
    { name: "Makeup & Skincare", path: "/makeup-skincare" },
    { name: "Jewelry & Watches", path: "/jewelry-watches" },
    { name: "Eyewear & Fragrance", path: "/eyewear-fragrance" },
    { name: "Galerie", path: "/galerie" },
  ];

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

  const navItem =
    "text-[10px] font-medium uppercase tracking-[0.2em] transition-opacity duration-200 hover:opacity-50";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-neutral-200 bg-white"
      aria-label="Primary navigation"
    >
      {/* =====================================================
          DESKTOP / TOP BAR
      ====================================================== */}
      <div className="mx-auto flex h-[68px] max-w-[1800px] items-center px-5 md:px-8 lg:px-12">
        {/* LOGO */}
        <NavLink
          to={isLoggedIn ? "/home" : "/"}
          onClick={closeMenus}
          className="shrink-0"
        >
          <h1 className="font-serif text-[22px] font-medium tracking-[0.32em] md:text-[24px]">
            CHANEL
          </h1>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="ml-auto hidden items-center lg:flex">
          {/* COLLECTIONS */}
          {isLoggedIn && (
            <div className="relative mr-9" data-navbar-dropdown>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollectionsOpen((open) => !open);
                  setIsProfileOpen(false);
                }}
                className={`${navItem} flex items-center gap-2`}
              >
                Collections
                <svg
                  className={`h-3 w-3 transition-transform duration-300 ${
                    isCollectionsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {isCollectionsOpen && (
                <div className="absolute right-0 top-[calc(100%+18px)] w-[260px] border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-100 px-6 py-5">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                      Explore
                    </p>
                  </div>

                  <div className="py-2">
                    {collections.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={closeMenus}
                        className="group flex items-center justify-between px-6 py-3.5 text-[11px] transition-colors hover:bg-neutral-50"
                      >
                        <span>{item.name}</span>

                        <span className="translate-x-[-5px] text-neutral-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABOUT */}
          <NavLink
            to="/about"
            onClick={closeMenus}
            className={`${navItem} mr-9`}
          >
            About
          </NavLink>

          {/* CONTACT */}
          <NavLink
            to="/contact"
            onClick={closeMenus}
            className={`${navItem} mr-9`}
          >
            Contact
          </NavLink>

          {/* SHOP */}
          {isLoggedIn && (
            <NavLink
              to="/shop"
              onClick={closeMenus}
              className={`${navItem} mr-9`}
            >
              Shop
            </NavLink>
          )}

          {/* CART */}
          {isLoggedIn && (
            <NavLink
              to="/cart"
              onClick={closeMenus}
              className="relative mr-8 flex items-center transition-opacity hover:opacity-50"
              aria-label={`Cart, ${totalCount} items`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[8px] text-white">
                  {totalCount}
                </span>
              )}
            </NavLink>
          )}

          {/* PROFILE */}
          <div className="relative" data-navbar-dropdown>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileOpen((open) => !open);
                setIsCollectionsOpen(false);
              }}
              className="flex items-center gap-2 transition-opacity hover:opacity-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>

              <span className={navItem}>Profile</span>

              <svg
                className={`h-3 w-3 transition-transform duration-300 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+18px)] w-[230px] border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-6 py-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                    My Account
                  </p>
                </div>

                <div className="py-2">
                  {!isLoggedIn && (
                    <>
                      <NavLink
                        to="/signin"
                        onClick={closeMenus}
                        className="block px-6 py-3.5 text-[11px] transition hover:bg-neutral-50"
                      >
                        Sign In
                      </NavLink>

                      <NavLink
                        to="/register"
                        onClick={closeMenus}
                        className="block px-6 py-3.5 text-[11px] transition hover:bg-neutral-50"
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
                        className="block px-6 py-3.5 text-[11px] transition hover:bg-neutral-50"
                      >
                        My Profile
                      </NavLink>

                      <div className="my-2 border-t border-neutral-100" />

                      <button
                        onClick={handleLogout}
                        className="block w-full px-6 py-3.5 text-left text-[11px] transition hover:bg-neutral-50"
                      >
                        Log Out
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => {
            setIsMobileOpen((open) => !open);
            setIsMobileCollectionsOpen(false);
            setIsCollectionsOpen(false);
            setIsProfileOpen(false);
          }}
          className="ml-auto flex h-8 w-8 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="21"
              height="21"
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

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`overflow-hidden border-t border-neutral-200 transition-all duration-500 ease-in-out lg:hidden ${
          isMobileOpen ? "max-h-[900px]" : "max-h-0"
        }`}
      >
        <div className="bg-white px-6 pb-8 pt-4">
          {/* COLLECTIONS */}
          {isLoggedIn && (
            <div className="border-b border-neutral-200 py-3">
              <button
                type="button"
                onClick={() =>
                  setIsMobileCollectionsOpen((open) => !open)
                }
                aria-expanded={isMobileCollectionsOpen}
                className="flex w-full items-center justify-between py-4 text-[10px] font-medium uppercase tracking-[0.22em]"
              >
                Collections
                <svg
                  className={`h-3 w-3 shrink-0 transition-transform duration-300 ${
                    isMobileCollectionsOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {isMobileCollectionsOpen && (
                <div className="ml-3 pb-3 pt-1">
                  {collections.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="block py-3 text-[11px] text-neutral-600"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MAIN LINKS */}
          <div className="border-b border-neutral-200 py-3">
            <NavLink
              to="/about"
              onClick={closeMenus}
              className="block py-4 text-[10px] font-medium uppercase tracking-[0.22em]"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenus}
              className="block py-4 text-[10px] font-medium uppercase tracking-[0.22em]"
            >
              Contact
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/shop"
                onClick={closeMenus}
                className="block py-4 text-[10px] font-medium uppercase tracking-[0.22em]"
              >
                Shop
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                to="/cart"
                onClick={closeMenus}
                className="flex items-center gap-3 py-4 text-[10px] font-medium uppercase tracking-[0.22em]"
              >
                Cart
                {totalCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[8px] text-white">
                    {totalCount}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {/* ACCOUNT */}
          <div className="pt-6">
            <p className="mb-3 text-[9px] uppercase tracking-[0.25em] text-neutral-400">
              My Account
            </p>

            {!isLoggedIn && (
              <>
                <NavLink
                  to="/signin"
                  onClick={closeMenus}
                  className="block py-3 text-[10px] uppercase tracking-[0.22em]"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenus}
                  className="block py-3 text-[10px] uppercase tracking-[0.22em]"
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
                  className="block py-3 text-[10px] uppercase tracking-[0.22em]"
                >
                  My Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="block py-3 text-left text-[10px] uppercase tracking-[0.22em]"
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
