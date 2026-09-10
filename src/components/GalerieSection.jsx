const gallery = [
  {
    src: "https://i.pinimg.com/736x/4e/2e/96/4e2e96d6a9871f3170848140881174e8.jpg",
    alt: "Chanel shopping bag editorial",
    framed: false,
  },
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_768/q_auto:good,f_autoplus,dpr_1/1666769599758-15954065429011912chaneladeauvillecollectionparticulieredjpgmaxmdmdjpg_1562x974.jpg",
    alt: "Chanel boutique archive",
    framed: true,
  },
  {
    src: "https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg",
    alt: "Chanel heritage portrait",
    framed: false,
  },
];

export default function GalerieSection() {
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
            <div
              key={item.src}
              className={`overflow-hidden ${
                item.framed ? "border-[3px] border-white" : ""
              }`}
            >
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
