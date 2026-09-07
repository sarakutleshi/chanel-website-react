import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts({ featured }) {
  return (
    <section className="w-full border-t border-neutral-100 bg-white py-14 md:py-20">

      <div className="mx-auto mb-8 max-w-6xl px-6 md:mb-10 md:px-12">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-5">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.38em] text-neutral-400">
              The Edit
            </p>

            <h2 className="font-serif text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
              Featured Pieces
            </h2>
          </div>

          <NavLink
            to="/shop"
            className="hidden text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition-opacity hover:opacity-50 sm:block"
          >
            View All →
          </NavLink>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="w-full">
        <div
          className="
            flex
            w-full
            gap-4
            overflow-x-auto
            px-6
            pb-2
            md:px-12
            scrollbar-hide
            snap-x
            snap-mandatory
          "
        >
          {featured?.map((p) => (
            <div
              key={p.id}
              className="
                w-[185px]
                shrink-0
                snap-start
                sm:w-[205px]
                md:w-[225px]
                lg:w-[240px]
              "
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View All */}
      <div className="mt-6 px-6 sm:hidden">
        <NavLink
          to="/shop"
          className="flex items-center justify-between border-b border-neutral-200 pb-3 text-[9px] uppercase tracking-[0.2em] text-neutral-500"
        >
          <span>View All Pieces</span>
          <span>→</span>
        </NavLink>
      </div>

    </section>
  );
}