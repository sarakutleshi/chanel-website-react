import { NavLink } from "react-router-dom";

const COLLECTIONS = [
  { name: "Fashion", path: "/fashion" },
  { name: "Jewelry & Watches", path: "/jewelry-watches" },
  { name: "Makeup & Skincare", path: "/makeup-skincare" },
  { name: "Eyewear & Fragrance", path: "/eyewear-fragrance" },
  { name: "Galerie", path: "/galerie" },
];

const LINKS = [
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Contact", path: "/contact" },
];

const BOUTIQUES = ["Florence", "Vienna", "Paris", "Prague", "Tirana"];

export default function Footer() {
  return (
    <footer className="bg-black text-white" aria-label="Site footer">
      <div className="mx-auto max-w-[1100px] px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="text-center md:max-w-[220px] md:text-left">
            <p className="font-serif text-xl font-light tracking-[0.36em]">
              CHANEL
            </p>
            <p className="mt-3 text-[11px] leading-5 text-white/40">
              The House of Chanel, founded by Gabrielle Bonheur Chanel.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 sm:gap-10 md:text-left">
            <div>
              <h3 className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/35">
                Collections
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {COLLECTIONS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="text-[11px] text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/35">
                The House
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {LINKS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="text-[11px] text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/35">
                Boutiques
              </h3>
              <p className="mt-3 text-[11px] leading-5 text-white/55">
                {BOUTIQUES.join(" · ")}
              </p>
              <a
                href="tel:+123456789"
                className="mt-3 inline-block border-b border-white/20 pb-0.5 text-[11px] text-white/65 transition-colors hover:border-white hover:text-white"
              >
                +1 234 567 89
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2 px-6 py-4 text-[9px] uppercase tracking-[0.16em] text-white/25 sm:flex-row md:px-10">
          <span>© 2026 Chanel. All rights reserved.</span>
          <span className="tracking-[0.18em]">
            Paris · London · New York · Tokyo
          </span>
        </div>
      </div>
    </footer>
  );
}
