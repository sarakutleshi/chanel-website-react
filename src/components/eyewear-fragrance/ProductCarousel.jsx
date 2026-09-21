import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function normalizeProduct(item) {
  const name = item.name || item.title || "";
  const img = item.img || item.images?.[0] || "";
  const rawPrice = item.price;
  const price =
    typeof rawPrice === "number"
      ? rawPrice
      : parseFloat(String(rawPrice).replace(/[^0-9.]/g, "")) || 0;

  return {
    ...item,
    id: item.id || name.toLowerCase().replace(/\s+/g, "-"),
    name,
    img,
    price,
    desc: item.desc || item.description || "",
    category: item.category || "",
    subcategory: item.subcategory || item.category || "",
    tag: item.tag,
    btn: item.btn,
  };
}

function ShopCard({ item, backPath, backLabel }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const priceDisplay =
    typeof item.price === "number"
      ? item.price === 0
        ? "On request"
        : `$${item.price.toLocaleString()}`
      : item.price;

  function goToDetail() {
    navigate("/product", {
      state: {
        product: item,
        backPath,
        backLabel,
      },
    });
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart({
      id: item.id || item.name.toLowerCase().replace(/\s+/g, "-"),
      name: item.name,
      img: item.img,
      price: priceDisplay,
      category: item.subcategory || item.category,
      desc: item.desc,
    });
    setAdding(true);
    window.setTimeout(() => setAdding(false), 1400);
  }

  return (
    <article
      onClick={goToDetail}
      className="group flex cursor-pointer flex-col px-10"
    >
      <div className="relative aspect-[3.5/4] overflow-hidden bg-[#f4f3f0]">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {item.tag && (
          <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-white">
            {item.tag}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
              adding
                ? "bg-neutral-700 text-white"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {adding ? "✓ Added" : item.btn || "Add to bag"}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--muted)]">
          {(item.subcategory || item.category || "").replaceAll("-", " ")}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.04em]">
            {item.name}
          </h3>
          <span className="shrink-0 text-[12px] tracking-[0.02em]">
            {priceDisplay}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProductCarousel({
  title,
  eyebrow,
  sectionId = "shop",
  backPath = "/shop",
  backLabel = "Shop",
  apiUrl,
  products: productsProp,
  categories = [],
  filterKey = "subcategory",
  limit = 3,
  viewMoreTo,
  viewMoreLabel = "View More →",
  className = "",
}) {
  const [fetched, setFetched] = useState([]);
  const [loading, setLoading] = useState(Boolean(apiUrl));
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(categories[0] || "All");

  useEffect(() => {
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setFetched(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const allItems = useMemo(() => {
    const source = apiUrl ? fetched : productsProp || [];
    return source.map(normalizeProduct);
  }, [apiUrl, fetched, productsProp]);

  const visible = useMemo(() => {
    const filtered =
      !categories.length || category === "All"
        ? allItems
        : allItems.filter((item) => item[filterKey] === category);
    return limit > 0 ? filtered.slice(0, limit) : filtered;
  }, [allItems, categories, category, filterKey, limit]);

  if (loading) {
    return (
      <section className="flex h-[250px] items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          Loading...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[250px] items-center justify-center">
        <p className="text-xs text-neutral-500">Unable to load products.</p>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className={`px-[var(--pad)] pt-6 pb-10 md:pt-10 md:pb-14 ${className}`}
    >
      <div className="mx-auto max-w-[1400px]">
        {(eyebrow || title || categories.length > 1) && (
          <div className="flex flex-col gap-8 border-b border-black/10 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              {eyebrow && (
                <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  className={`font-serif text-3xl font-light tracking-wide md:text-4xl ${
                    eyebrow ? "mt-3" : ""
                  }`}
                >
                  {title}
                </h2>
              )}
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`pb-1 text-[9px] uppercase tracking-[0.18em] transition-colors ${
                      category === cat
                        ? "border-b border-black text-black"
                        : "text-[var(--muted)] hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <ShopCard
              key={item.id || item.name || i}
              item={item}
              backPath={backPath}
              backLabel={backLabel}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-20 text-center text-sm text-[var(--muted)]">
            No pieces in this category.
          </p>
        )}

        {viewMoreTo && (
          <div className="mt-10 flex justify-center md:mt-12">
            <NavLink
              to={viewMoreTo}
              className="border-b border-black pb-0.5 text-[10px] uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
            >
              {viewMoreLabel}
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
}
