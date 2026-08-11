import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ProductCarousel({
  title,
  sectionId,
  backPath,
  backLabel,
  apiUrl,
}) {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

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

  // Loading state
  if (loading) {
    return (
      <section
        id={sectionId}
        className="flex min-h-[300px] items-center justify-center"
      >
        <p className="text-sm uppercase tracking-[0.2em]">
          Loading sunglasses...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id={sectionId}
        className="flex min-h-[300px] items-center justify-center"
      >
        <p className="text-sm text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section id={sectionId} className="w-full py-16 pt-12">
      {/* Title */}
      <h2 className="family-sans mb-10 h-[26px] text-center text-[1.5rem] font-semibold uppercase tracking-[0.24rem] text-gray">
        {title}
      </h2>

    
      <div className="relative flex items-center gap-6 overflow-hidden px-2 max-[560px]:px-0 ">
        <div
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((item) => {
            const id = item.id;

            return (
              <article
                key={item.id}
                className="snap-start gap-[3rem] h-[450px] w-full  p-[15px] max-w-[340px] flex-shrink-0 cursor-pointer transition hover:opacity-80  bg-white p-4 shadow-sm"
                onClick={() =>
                  navigate("/product", {
                    state: {
                      product: {
                        ...item,
                        name: item.title,
                        img: item.images?.[0],
                      },
                      backPath,
                      backLabel,
                    },
                  })
                }
              >
              
                <div className="relative flex overflow-hidden bg-transparent text-center">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="h-[280px] w-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                  />

                  <button
                    onClick={(e) => toggleWishlist(e, id)}
                    className="absolute bottom-[14px] right-[14px] cursor-pointer border-0 bg-transparent p-[4px] text-[1.1rem] leading-none text-[var(--ink)] transition-[color,transform] duration-200 scale-[1.15]"
                  >
                    {wishlist[id] ? "★" : "☆"}
                  </button>
                </div>

             
                <div className="flex flex-col gap-[0.35rem] pt-[0.85rem] mb-10">
                  <h3 className="m-0 font-sans text-xs font-bold uppercase leading-none tracking-[0.15em]">
                    {item.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 mb-3">
                    {item.description || item.desc}
                  </p>

                
                  <button
                    className="w-fit text-xs font-semibold tracking-[0.15em] underline underline-offset-4 transition hover:opacity-60"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate("/product", {
                        state: {
                          product: {
                            ...item,
                            name: item.title,
                            img: item.images?.[0],
                          },
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

      
        <button
          onClick={scroll}
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-[var(--rule)] bg-white text-2xl shadow-sm transition hover:bg-gray-100 md:right-4 md:h-10 md:w-10"
        >
          ›
        </button>
      </div>
    </section>
  );
}
