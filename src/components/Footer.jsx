export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white" aria-label="Site footer">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 border-b border-white/10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3 md:px-10 md:py-20">
        <div>
          <p className="font-serif text-2xl font-light tracking-[0.28em]">
            CHANEL
          </p>
          <p className="mt-5 max-w-[28ch] text-[13px] leading-7 text-white/45">
            The House of Chanel, founded by Gabrielle Bonheur Chanel.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Our Boutiques
          </h3>
          <ul className="flex flex-col gap-2.5">
            {[
              "Chanel Florence, Italy",
              "Chanel Vienna, Austria",
              "Chanel Paris, France",
              "Chanel Prague, Czechia",
              "Chanel Tirana, Albania",
            ].map((loc) => (
              <li
                key={loc}
                className="text-[13px] text-white/65 transition-colors hover:text-white"
              >
                {loc}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Contact
          </h3>
          <p className="text-[13px] leading-7 text-white/65">
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

      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-5 text-[11px] text-white/30 sm:flex-row md:px-10">
        <span>© 2026 CHANEL. All rights reserved.</span>
        <span>Paris · London · New York · Tokyo</span>
      </div>
    </footer>
  );
}
