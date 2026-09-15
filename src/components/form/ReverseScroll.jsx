import { useEffect, useRef } from "react";

const images = [
  [
    "https://www.chanel.com/puls-img/c_limit,w_768/q_auto:good,f_autoplus,dpr_1/1666769636973-1598436152349hdbhvpnv00603107jpgmaxlglgjpg_2068x3000.jpg",
    "https://www.chanel.com/puls-img/c_limit,w_480/q_auto:good,f_autoplus,dpr_1/1666769979453-15954241665431945americansoldiersdcropjpgmaxmdmdjpg_1128x974.jpg",
    "https://i.pinimg.com/736x/4e/2e/96/4e2e96d6a9871f3170848140881174e8.jpg",
    "https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg",
    "https://i.pinimg.com/736x/d1/90/34/d19034a6e9e95b37d1aff5d081561df9.jpg",
  ],
  [
    "https://www.chanel.com/puls-img/c_limit,w_768/q_auto:good,f_autoplus,dpr_1/1666769599758-15954065429011912chaneladeauvillecollectionparticulieredjpgmaxmdmdjpg_1562x974.jpg",
    "https://www.chanel.com/puls-img/c_limit,w_640/q_auto:good,f_autoplus,dpr_1/1666770140873-1598436067925e3017cgarnierphilippeelleginalollobrigidachezchanelen1964goodjpgmaxlglgjpg_2002x3000.jpg",
    "https://www.chanel.com/puls-img/c_limit,w_480/q_auto:good,f_autoplus,dpr_1/1666771629238-1598436390994pa200500211jpgmaxlglgjpg_3000x2271.jpg",
    "https://i.pinimg.com/1200x/58/7c/09/587c0974b033c422681d25d1764f717f.jpg",
    "https://www.chanel.com/puls-img/c_limit,w_640/q_auto:good,f_autoplus,dpr_1/1666770394823-1595428087884201801karldjpgmaxmdmdjpg_1272x974.jpg",
  ],
  [
    "https://i.pinimg.com/736x/0d/f8/46/0df846658321ede7fde28d52c9907159.jpg",
    "https://i.pinimg.com/736x/c5/f3/b6/c5f3b6a752e37d54da7619414241f08d.jpg",
    "https://i.pinimg.com/1200x/5e/a8/a7/5ea8a7c9953cc09bf99bb8c27faaab64.jpg",
    "https://i.pinimg.com/736x/7c/07/a3/7c07a39b87e5270c63189b1870b0bf79.jpg",
  ],
];

function Column({ srcs, reverse, columnRef }) {
  return (
    <div
      ref={columnRef}
      className={`flex flex-col gap-3 md:gap-4 ${reverse ? "column-reverse" : ""}`}
    >
      {srcs.map((src, index) => (
        <div key={index} className="group overflow-hidden bg-neutral-200">
          <img
            src={src}
            alt=""
            loading="lazy"
            className="block w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ))}
    </div>
  );
}

export default function ReverseScroll() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reverseColumns = [
      leftRef.current,
      rightRef.current,
    ].filter(Boolean);

    if (window.ScrollTimeline) {
      container.style.overflowY = "hidden";

      const timeline = new ScrollTimeline({
        source: document.documentElement,
      });

      reverseColumns.forEach((column) => {
        column.style.flexDirection = "column-reverse";

        column.animate(
          {
            transform: [
              "translateY(calc(-100% + 100vh))",
              "translateY(calc(100% - 100vh))",
            ],
          },
          {
            fill: "both",
            timeline,
          },
        );
      });

      return () => {
        reverseColumns.forEach((column) => {
          column.getAnimations().forEach((animation) => {
            animation.cancel();
          });
        });
      };
    }

    reverseColumns.forEach((column) => {
      column.style.flexDirection = "column-reverse";
      column.style.willChange = "transform";
    });

    let ticking = false;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height + viewH;
      const progress = Math.min(1, Math.max(0, (viewH - rect.top) / total));
      const offset = (progress - 0.5) * 80;

      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${offset}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${-offset}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reverseColumns.forEach((column) => {
        column.style.transform = "";
        column.style.willChange = "";
      });
    };
  }, []);

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.38em] text-white/40">
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

        <div
          ref={containerRef}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
        >
          <Column srcs={images[0]} reverse columnRef={leftRef} />
          <div className="hidden md:block">
            <Column srcs={images[1]} />
          </div>
          <Column srcs={images[2]} reverse columnRef={rightRef} />
        </div>
      </div>
    </section>
  );
}
