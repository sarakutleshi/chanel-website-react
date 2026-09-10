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
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const openProduct = (item) => {
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
  };

  const scroll = () => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: trackRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="flex h-[250px] items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
          Loading...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[250px] items-center justify-center">
        <p className="text-xs text-gray-500">Unable to load products.</p>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden bg-white py-2"
    >
      {/* Title */}
      <h2 className="mb-10 text-center text-[20px] font-medium uppercase tracking-[0.16em]">
        {title}
      </h2>

      {/* Products */}
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((item) => (
          <article
            key={item.id}
            onClick={() => openProduct(item)}
            className="w-full min-w-full flex-shrink-0 cursor-pointer snap-start px-4 text-center sm:w-1/2 sm:min-w-[50%] md:w-1/3 md:min-w-[33.333333%]"
          >
            {/* Image */}
            <div className="flex h-[220px] items-center justify-center md:h-[250px]">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="h-[160px] w-[160px] object-contain md:h-[190px] md:w-[190px]"
              />
            </div>

            {/* Product Info */}
            <div className="mx-auto max-w-[280px]">
              <p className="mb-1 text-[9px] uppercase tracking-[0.22em] text-gray-500">
                {item.category?.replaceAll("-", " ") || "Collection"}
              </p>

              <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                {item.title}
              </h3>

              <p className="mt-1 line-clamp-1 text-[11px] text-gray-600">
                {item.description || item.desc}
              </p>

              <p className="mt-1 text-[10px] text-gray-700">
                Click &amp; Collect
              </p>

              <p className="mt-1 text-[11px] font-semibold">
                ${Number(item.price).toLocaleString()}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProduct(item);
                }}
                className="mt-5 text-[11px] hover:opacity-50"
              >
                View details <span className="ml-1">›</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={scroll}
        aria-label="Next"
        className="absolute right-4 top-[48%] text-lg font-light hover:opacity-50"
      >
        →
      </button>
    </section>
  );
}
