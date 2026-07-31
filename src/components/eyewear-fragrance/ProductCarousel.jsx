import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function ProductCarousel({
  products,
  title,
  sectionId,
  backPath,
  backLabel,
}) {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [wishlist, setWishlist] = useState({});

  const scroll = () => {
    if (!trackRef.current) return;

    const card = trackRef.current.querySelector(".carousel-card");

    const gap = 24;
    const step = card ? card.offsetWidth + gap : 340;

    trackRef.current.scrollBy({
      left: step,
      behavior: "smooth",
    });
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();

    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id={sectionId} className="w-full py-16 pt-12">
      <h2 className="family-sans h-[26px] font-semibold tracking-[0.24rem] text-[1.5rem] uppercase  text-center text-gray mb-10">
        {title}
      </h2>

      <div className="relative flex p-4">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none] flex-1 [&::-webkit-scrollbar]:hidden "
        >
          {products.map((item) => {
            const id = item.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <article
                key={id}
                className="flex-[0_0_calc((100%-48px)/3)] snap-start cursor-pointer bg-transparent tracking-[1.2rem]"
                onClick={() =>
                  navigate("/product", {
                    state: {
                      product: item,
                      backPath,
                      backLabel,
                    },
                  })
                }
              >
                {/* IMAGE */}

                <div className="relative bg-transparent owerflow-hidden flex text-center justify-center tracking-[1.0rem]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-[2rem] w-full p-12 m-5 object-contain transition-transform duration-500 hover:scale-105"
                  />

                  <button
                    onClick={(e) => toggleWishlist(e, id)}
                    className="absolute bottom-[14px] right-[14px] bg-none border-0 text-[1.1rem]
                    cursor-pointer p-4px leading-none 
                     transition-[color,transform] duration-200 text-[var(--ink)] scale-[1.15]"
                  >
                    {wishlist[id] ? "★" : "☆"}
                  </button>
                </div>

                {/* INFO */}

                <div className="pt-[0.85rem] flex flex-col gap-[0.35rem] ">
                  <h3 className="font-sans m-0 leading-none text-xs font-bold uppercase tracking-[0.15em]">
                    {item.name}
                  </h3>

                  <button
                    className="w-fit text-xs font-semibold text-[0.75rem]  underline underline-offset-4 transition tracking-[0.15em] hover:opacity-60"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate("/product", {
                        state: {
                          product: item,
                          backPath,
                          backLabel,
                        },
                      });
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Arrow */}

        <button
          onClick={scroll}
          className="absolute right-2 md:right-4 top-1/2 -z-0 flex h-9 w-9 md:h-10
md:w-10 -translate-y-1/2 items-center justify-center border border-[var(--rule)] bg-white text-2xl shadow-sm transition hover:bg-gray-100
"
        >
          ›
        </button>
      </div>
    </section>
  );
}
