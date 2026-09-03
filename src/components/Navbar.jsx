
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();

  /* =========================
     COLLECTIONS
  ========================= */

  const collections = [
    {
      name: "Fashion",
      path: "/fashion",
    },
    {
      name: "Makeup & Skincare",
      path: "/makeup-skincare",
    },
    {
      name: "Jewelry & Watches",
      path: "/jewelry-watches",
    },
    {
      name: "Eyewear & Fragrance",
      path: "/eyewear-fragrance",
    },
    {
      name: "Galerie",
      path: "/galerie",
    },
  ];

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    logout();

    setIsCollectionsOpen(false);
    setIsProfileOpen(false);
    setIsMobileOpen(false);

    navigate("/");
  };

  /* =========================
     CLOSE MENUS
  ========================= */

  const closeMenus = () => {
    setIsCollectionsOpen(false);
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-neutral-200 bg-white"
      aria-label="Primary navigation"
    >
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="mx-auto flex h-20 max-w-[1600px] items-center px-6 md:px-10 lg:px-14">

        {/* =====================================================
            CHANEL LOGO - LEFT
        ====================================================== */}

        <NavLink
          to={isLoggedIn ? "/home" : "/"}
          onClick={closeMenus}
          className="mr-auto no-underline"
        >
          <h1 className="text-2xl font-semibold tracking-[0.3em] md:text-3xl">
            CHANEL
          </h1>
        </NavLink>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <div className="hidden items-center gap-8 lg:flex">

          {/* =================================================
              COLLECTIONS
              ONLY VISIBLE WHEN LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <div className="relative">

              <button
                onClick={() => {
                  setIsCollectionsOpen(!isCollectionsOpen);
                  setIsProfileOpen(false);
                }}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition hover:opacity-60"
              >
                Collections

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 transition-transform duration-200 ${
                    isCollectionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
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

              {/* COLLECTIONS DROPDOWN */}

              {isCollectionsOpen && (
                <div className="absolute right-0 top-full mt-6 w-64 border border-neutral-200 bg-white py-3">

                  <div className="px-5 pb-3 pt-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                      Explore
                    </p>
                  </div>

                  {collections.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="block px-5 py-3 text-sm transition hover:bg-neutral-50"
                    >
                      {item.name}
                    </NavLink>
                  ))}

                </div>
              )}

            </div>
          )}

          {/* =================================================
              ABOUT
              VISIBLE TO EVERYONE
          ================================================== */}

          <NavLink
            to="/about"
            onClick={closeMenus}
            className="text-xs uppercase tracking-[0.15em] transition hover:opacity-60"
          >
            About
          </NavLink>

          {/* =================================================
              CONTACT
              VISIBLE TO EVERYONE
          ================================================== */}

          <NavLink
            to="/contact"
            onClick={closeMenus}
            className="text-xs uppercase tracking-[0.15em] transition hover:opacity-60"
          >
            Contact
          </NavLink>

          {/* =================================================
              SHOP
              ONLY VISIBLE WHEN LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <NavLink
              to="/shop"
              onClick={closeMenus}
              className="text-xs uppercase tracking-[0.15em] transition hover:opacity-60"
            >
              Shop
            </NavLink>
          )}

          {/* =================================================
              CART
              ONLY VISIBLE WHEN LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <NavLink
              to="/cart"
              onClick={closeMenus}
              className="relative flex items-center transition hover:opacity-60"
              aria-label={`Cart, ${totalCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
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
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {totalCount}
                </span>
              )}
            </NavLink>
          )}

          {/* =================================================
              PROFILE
              VISIBLE TO EVERYONE
          ================================================== */}

          <div className="relative">

            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsCollectionsOpen(false);
              }}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition hover:opacity-60"
            >

              {/* USER ICON */}

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
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>

              Profile

              {/* ARROW */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
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

            {/* =================================================
                PROFILE DROPDOWN
            ================================================== */}

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-6 w-56 border border-neutral-200 bg-white py-3">

                <div className="px-5 pb-3 pt-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    My Account
                  </p>
                </div>

                {/* ===============================
                    LOGGED OUT
                ================================ */}

                {!isLoggedIn && (
                  <>
                    <NavLink
                      to="/signin"
                      onClick={closeMenus}
                      className="block px-5 py-3 text-sm transition hover:bg-neutral-50"
                    >
                      Sign In
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={closeMenus}
                      className="block px-5 py-3 text-sm transition hover:bg-neutral-50"
                    >
                      Create Account
                    </NavLink>
                  </>
                )}

                {/* ===============================
                    LOGGED IN
                ================================ */}

                {isLoggedIn && (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={closeMenus}
                      className="block px-5 py-3 text-sm transition hover:bg-neutral-50"
                    >
                      My Profile
                    </NavLink>

                    <NavLink
                      to="/wishlist"
                      onClick={closeMenus}
                      className="block px-5 py-3 text-sm transition hover:bg-neutral-50"
                    >
                      Wishlist
                    </NavLink>

                    <div className="my-2 border-t border-neutral-100" />

                    <button
                      onClick={handleLogout}
                      className="block w-full px-5 py-3 text-left text-sm transition hover:bg-neutral-50"
                    >
                      Log Out
                    </button>
                  </>
                )}

              </div>
            )}

          </div>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <button
          onClick={() => {
            setIsMobileOpen(!isMobileOpen);
            setIsCollectionsOpen(false);
            setIsProfileOpen(false);
          }}
          className="ml-6 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {isMobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
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

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`overflow-hidden border-t border-neutral-200 transition-all duration-300 lg:hidden ${
          isMobileOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="bg-white px-6 py-8">

          {/* =================================================
              MOBILE COLLECTIONS
              ONLY LOGGED IN
          ================================================== */}

          {isLoggedIn && (
            <div className="border-b border-neutral-200 pb-5">

              <button
                onClick={() =>
                  setIsCollectionsOpen(!isCollectionsOpen)
                }
                className="flex w-full items-center justify-between py-3 text-xs uppercase tracking-[0.2em]"
              >
                Collections

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    isCollectionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
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
                <div className="ml-4 mt-2 flex flex-col">

                  {collections.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="py-3 text-sm text-neutral-700"
                    >
                      {item.name}
                    </NavLink>
                  ))}

                </div>
              )}

            </div>
          )}

          {/* =================================================
              MOBILE GENERAL LINKS
          ================================================== */}

          <div className="flex flex-col border-b border-neutral-200 py-5">

            {/* ABOUT */}

            <NavLink
              to="/about"
              onClick={closeMenus}
              className="py-3 text-xs uppercase tracking-[0.2em]"
            >
              About
            </NavLink>

            {/* CONTACT */}

            <NavLink
              to="/contact"
              onClick={closeMenus}
              className="py-3 text-xs uppercase tracking-[0.2em]"
            >
              Contact
            </NavLink>

            {/* SHOP - LOGGED IN ONLY */}

            {isLoggedIn && (
              <NavLink
                to="/shop"
                onClick={closeMenus}
                className="py-3 text-xs uppercase tracking-[0.2em]"
              >
                Shop
              </NavLink>
            )}

            {/* CART - LOGGED IN ONLY */}

            {isLoggedIn && (
              <NavLink
                to="/cart"
                onClick={closeMenus}
                className="flex items-center gap-3 py-3 text-xs uppercase tracking-[0.2em]"
              >
                Cart

                {totalCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    {totalCount}
                  </span>
                )}
              </NavLink>
            )}

          </div>

          {/* =================================================
              MOBILE ACCOUNT
          ================================================== */}

          <div className="pt-5">

            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              My Account
            </p>

            {/* ===============================
                LOGGED OUT
            ================================ */}

            {!isLoggedIn && (
              <div className="flex flex-col">

                <NavLink
                  to="/signin"
                  onClick={closeMenus}
                  className="py-3 text-xs uppercase tracking-[0.2em]"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenus}
                  className="py-3 text-xs uppercase tracking-[0.2em]"
                >
                  Create Account
                </NavLink>

              </div>
            )}

            {/* ===============================
                LOGGED IN
            ================================ */}

            {isLoggedIn && (
              <div className="flex flex-col">

                <NavLink
                  to="/profile"
                  onClick={closeMenus}
                  className="py-3 text-xs uppercase tracking-[0.2em]"
                >
                  My Profile
                </NavLink>

                <NavLink
                  to="/wishlist"
                  onClick={closeMenus}
                  className="py-3 text-xs uppercase tracking-[0.2em]"
                >
                  Wishlist
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="py-3 text-left text-xs uppercase tracking-[0.2em]"
                >
                  Log Out
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

