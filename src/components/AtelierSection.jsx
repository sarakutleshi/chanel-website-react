const gallery = [
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_640/q_auto:good,f_autoplus,dpr_1/1666770394823-1595428087884201801karldjpgmaxmdmdjpg_1272x974.jpg",
    alt: "Chanel shopping bag editorial",
    framed: false,
  },
  {
    src: "https://i.pinimg.com/736x/7c/07/a3/7c07a39b87e5270c63189b1870b0bf79.jpg",
    alt: "Chanel boutique archive",
    framed: true,
  },
  {
    src: "https://i.pinimg.com/1200x/58/7c/09/587c0974b033c422681d25d1764f717f.jpg",
    alt: "Chanel heritage portrait",
    framed: false,
  },
];

export default function AtelierSection() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mb-12 text-center md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.38em] text-white/55">
            Galerie
          </p>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-wide md:text-5xl">
            In the atelier
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/45">
            A visual journey through runway, craft, and the enduring codes of
            the House.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {gallery.map((item) => (
            <div key={item.src} className={`overflow-hidden`}>
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center grayscale transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
