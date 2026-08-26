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
      <section className="flex h-[500px] items-center justify-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Loading...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Unable to load products.
        </p>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden bg-white py-20"
    >
  

      <h2 className="mb-20 text-center text-[28px] font-medium uppercase tracking-[0.18em]">
        {title}
      </h2>

 

      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((item) => (
          <article
            key={item.id}
            onClick={() => openProduct(item)}
            className="w-full min-w-full flex-shrink-0 cursor-pointer snap-start px-10 text-center sm:w-1/2 sm:min-w-[50%] md:w-1/3 md:min-w-[33.333333%]"
          >

            <div className="flex h-[300px] items-center justify-center md:h-[360px]">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            </div>

        

            <div className="mx-auto mt-10 max-w-[350px]">
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gray-500">
                {item.category?.replaceAll("-", " ") || "Collection"}    
              </p>

              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em]">
                {item.title}
              </h3>

              <p className="mt-2 line-clamp-1 text-[13px] text-gray-600">
                {item.description || item.desc}
              </p>

              <p className="mt-1 text-[12px] text-gray-700">
                Click &amp; Collect
              </p>

              <p className="mt-1 text-[13px] font-semibold">
                ${Number(item.price).toLocaleString()}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProduct(item);
                }}
                className="mt-12 text-[13px] transition-opacity hover:opacity-50"
              >
                View details <span className="ml-1">›</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <button
        onClick={scroll}
        aria-label="Next"
        className="absolute right-8 top-[47%] text-xl font-light hover:opacity-50"
      >
        →
      </button>
    </section>
  );
}