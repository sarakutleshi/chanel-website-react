export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white" aria-label="Site footer">
      {/* Main grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 border-b border-white/10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3 md:px-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl font-semibold tracking-[0.2em]">CHANEL</p>
          <p className="mt-4 max-w-[26ch] text-[13px] leading-7 text-white/45">
            The House of Chanel, founded by Gabrielle Bonheur Chanel.
          </p>
        </div>

        {/* Boutiques */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Our Boutiques
          </h3>
          <ul className="flex flex-col gap-2">
            {["Chanel Florence, Italy", "Chanel Vienna, Austria", "Chanel Paris, France", "Chanel Prague, Czechia", "Chanel Tirana, Albania"].map(
              (loc) => (
                <li key={loc} className="text-[13px] text-white/70">
                  {loc}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Contact
          </h3>
          <p className="text-[13px] leading-7 text-white/70">
            For inquiries, reach us at
            <br />
            <a
              href="tel:+123456789"
              className="border-b border-white/20 text-white/70 transition-colors hover:text-white"
            >
              +1 234 567 89
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-5 text-[11px] text-white/30 sm:flex-row md:px-10">
        <span>© 2024 CHANEL. All rights reserved.</span>
        <span>Paris · London · New York · Tokyo</span>
      </div>
    </footer>
  );
}
