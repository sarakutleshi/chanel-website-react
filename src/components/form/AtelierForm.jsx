import { NavLink } from "react-router-dom";

const gallery = [
  {
    src: "https://i.pinimg.com/736x/47/cc/06/47cc06b99db40da41f0d02bb4cd89bd9.jpg",
    alt: "Chanel editorial portrait",
  },
  {
    src: "https://i.pinimg.com/736x/da/c4/86/dac486b9b9919a5e921f78a7ae425666.jpg",
    alt: "Chanel boutique archive",
  },
  {
    src: "https://i.pinimg.com/1200x/96/a8/eb/96a8eb361c65a99cbff6d83414f15a75.jpg",
    alt: "Chanel heritage portrait",
  },
  {
    src: "https://i.pinimg.com/1200x/93/98/be/9398be19b6eb813ddb4d1b671ef96130.jpg",
    alt: "Chanel runway look",
  },
  {
    src: "https://i.pinimg.com/1200x/b4/e7/34/b4e73433699e2328c7c38e8fe8bda5ec.jpg",
    alt: "Chanel fashion detail",
  },
  {
    src: "https://i.pinimg.com/vwebp/1200x/04/54/1a/04541a75ccefcac6a2b5a95b3ca9e7ea.webp",
    alt: "Chanel house codes",
  },
  {
    src: "https://i.pinimg.com/736x/c8/89/33/c8893358569361daf41b479f9fc74966.jpg",
    alt: "Chanel style study",
  },
  {
    src: "https://i.pinimg.com/1200x/13/e5/31/13e53163d99a73272fee515102919a08.jpg",
    alt: "Chanel visual journey",
  },
];

export default function AtelierForm() {
  const loop = [...gallery, ...gallery];

  return (
    <section className="overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-10 md:py-10 lg:px-16">
        <div className="mb-4 text-center md:mb-6">
          <p className="text-[10px] uppercase tracking-[0.38em] text-white/55">
            Galerie
          </p>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-wide md:text-5xl">
            In the Atelier
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/45">
            A visual journey through runway, craft, and the enduring codes of
            the House.
          </p>
          <NavLink
            to="/galerie"
            className="mt-6 inline-block border-b border-white/40 pb-0.5 text-[10px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white hover:text-white"
          >
            Discover the Galerie →
          </NavLink>
        </div>
      </div>

      <div className="mb-10 overflow-hidden md:mb-14">
        <div className="flex w-max animate-[atelierTicker_40s_linear_infinite] gap-2 will-change-transform md:gap-4">
          {loop.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="w-[58vw] max-w-[200px] shrink-0 overflow-hidden bg-neutral-900 sm:w-[42vw] md:max-w-[300px]"
            >
              <div className="aspect-[4/4] overflow-hidden">
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

      <style>{`
        @keyframes atelierTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
