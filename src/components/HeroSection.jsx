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
        <p className="mt-3 text-sm leading-6 text-white/90">{description}</p>
        {href && (
          <a
            href={href}
            className="mt-8 inline-block border border-white px-10 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-white/10"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
