import { useEffect, useRef } from "react";

const images = [
  [
    "https://assets.vogue.com/photos/62274b72c0d4fbe60f143e7e/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    "https://i.pinimg.com/736x/4b/f8/a4/4bf8a4698481022fc097df6751c5ea1c.jpg",
    "https://assets.vogue.com/photos/62274b75921b9eb00286c727/master/w_1920,c_limit/00004-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    "https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg",
    "https://assets.vogue.com/photos/62274b7cf1c0bf717ac69a97/master/w_1920,c_limit/00006-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
  ],
  [
    "https://i.pinimg.com/736x/d6/e2/2c/d6e22c7fbdfb4b3e135e91b7554812f9.jpg",
    "https://i.pinimg.com/1200x/eb/fe/45/ebfe457d38f58088d8ce5f389101c66b.jpg",
    "https://i.pinimg.com/736x/71/af/4e/71af4e99ab6561d5dfbf738adc75a756.jpg",
    "https://i.pinimg.com/736x/62/53/84/62538407aa186cb2820528b20df07d57.jpg",
    "https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831",
  ],
  [
    "https://assets.vogue.com/photos/62274b83921b9eb00286c729/master/w_1920,c_limit/00009-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    "https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp",
    "https://assets.vogue.com/photos/62274b881c9add4585407320/master/w_1920,c_limit/00012-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    "https://i.pinimg.com/1200x/cb/0c/03/cb0c03d470708243623c08fced11e87c.jpg",
    "https://i.pinimg.com/736x/86/81/a8/8681a8244aaffbe534d40e0cb1370db2.jpg",
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
            className="block aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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

    // Graceful fallback: subtle opposing parallax on scroll
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
