import { useRef } from "react";
import { NavLink } from "react-router-dom";

const FEATURED_IDS = [
  "tweed-jacket",
  "rouge-allure-velvet",
  "coco-crush-ring",
  "chance-eau-tendre",
  "j12-watch",
  "shield-sunglasses",
];

export default function FeaturedProducts({ featured }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
              Curated Selection
            </p>

            <h2 className="mt-2 font-serif text-3xl font-light text-neutral-900 md:text-4xl">
              Featured Pieces
            </h2>
          </div>

          <NavLink
            to="/shop"
            className="hidden text-[11px] uppercase tracking-[0.18em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-black md:block"
          >
            View All →
          </NavLink>
        </div>

        {/* Products + Arrows */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/90 px-4 py-3 text-xl transition hover:bg-black hover:text-white"
            aria-label="Previous products"
          >
            ←
          </button>

          {/* Products */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {featured.map((p) => (
              <div
                key={p.id}
                className="w-[280px] shrink-0 md:w-[320px] lg:w-[350px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/90 px-4 py-3 text-xl transition hover:bg-black hover:text-white"
            aria-label="Next products"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}