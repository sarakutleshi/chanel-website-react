export default function HeroSection({
  src,
  uppertitle,
  title,
  description,
  buttonText,
  href,
}) {
  return (
    <section className="relative h-[520px]  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-16 left-10 z-10 max-w-xl text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/70">
          {uppertitle}
        </p>
        <h1 className="text-6xl font-light">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-white/90 mb-3">{description}</p>
        {href && (
          <a
            href={href}
            className="mt-10 bg-white px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-black transition hover:bg-black/90 hover:text-white/90"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
