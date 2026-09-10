export default function HeroSection({
  src,
  uppertitle,
  title,
  description,
  buttonText,
  href,
  fullPage = false,
}) {
  return (
    <section className="relative h-[620px]  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div
        className={`absolute z-10 max-w-xl text-white ${
          fullPage
            ? "bottom-20 left-[var(--pad)] md:bottom-24"
            : "bottom-16 left-10"
        }`}
      >
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/70">
          {uppertitle}
        </p>
        <h1
          className={`font-light ${
            fullPage ? "text-6xl md:text-7xl lg:text-8xl" : "text-6xl"
          }`}
        >
          {title}
        </h1>
        <p className="mt-3 mb-3 text-sm leading-6 text-white/90">{description}</p>
        {href && (
          <a
            href={href}
            className="mt-10 inline-block bg-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition hover:bg-black/90 hover:text-white/90"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
