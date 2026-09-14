import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import allProducts, {
  CATEGORIES,
  COLLECTIONS,
  ALL_COLORS,
  PRICE_RANGES,
} from "../data/all-products";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const COLOR_HEX = {
  Black: "#1a1a1a",
  White: "#f5f5f5",
  Ivory: "#fffff0",
  Beige: "#d4c5a9",
  Camel: "#c19a6b",
  Navy: "#1b2a4a",
  Red: "#c0392b",
  Nude: "#e8c9a0",
  Plum: "#8e4585",
  Berry: "#7b2d8b",
  Rose: "#e8a0b0",
  Coral: "#e8806a",
  Tortoise: "#8b4513",
  Gold: "#d4a017",
  Silver: "#a8a9ad",
  "Rose Gold": "#b76e79",
  "White Gold": "#e8e8e8",
  Blush: "#f4c2c2",
  Poudre: "#e8d5c4",
  Orchid: "#c08cbf",
  Prune: "#6b3058",
  Or: "#d4a017",
  Bleu: "#2c5f8a",
};

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200 py-4 sm:py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
          {title}
        </span>
        <span className="text-neutral-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function CheckItem({ label, checked, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5">
      <span
        className={`h-4 w-4 shrink-0 border transition-colors ${
          checked
            ? "border-black bg-black"
            : "border-neutral-300 bg-white group-hover:border-black"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-4 w-4 text-white" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-[13px] text-neutral-700">{label}</span>
    </label>
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  function goToDetail() {
    navigate("/product", {
      state: { product, backPath: "/shop", backLabel: "Shop" },
    });
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      img: product.img,
      price:
        product.price === 0
          ? "On request"
          : `$${product.price.toLocaleString()}`,
      category: product.category,
      desc: product.desc,
    });
    setAdding(true);
    window.setTimeout(() => setAdding(false), 1400);
  }

  const priceDisplay =
    product.price === 0
      ? "On request"
      : `$${product.price.toLocaleString()}`;

  return (
    <article
      onClick={goToDetail}
      className="group flex cursor-pointer flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-[9px]">
            {product.tag}
          </span>
        )}

        {/* Always visible on touch; hover reveal on desktop */}
        <div className="absolute inset-x-0 bottom-0 translate-y-0 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 sm:py-3.5 sm:text-[11px] ${
              adding
                ? "bg-neutral-700 text-white"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {adding ? "✓ Added" : "Add to Bag"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:mt-4">
        <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px] sm:tracking-[0.22em]">
          {product.subcategory}
        </p>
        <h3 className="text-[12px] font-medium leading-snug text-neutral-900 sm:text-[13px]">
          {product.name}
        </h3>

        {product.colors?.[0] !== "N/A" && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                className="h-2.5 w-2.5 rounded-full border border-neutral-300 sm:h-3 sm:w-3"
                style={{ backgroundColor: COLOR_HEX[color] || "#ccc" }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-neutral-400">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
        <p className="mt-1 text-[12px] font-light text-neutral-800 sm:text-[13px]">
          {priceDisplay}
        </p>
      </div>
    </article>
  );
}

function FilterPanel({
  activeCategory,
  setActiveCategory,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedCollections,
  setSelectedCollections,
  selectedColors,
  setSelectedColors,
  activeFilterCount,
  clearAllFilters,
  toggle,
}) {
  return (
    <div>
      <FilterSection title="Category">
        <div className="flex flex-col gap-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`py-1.5 text-left text-[13px] transition-colors ${
                activeCategory === cat
                  ? "font-semibold text-black"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="ml-2 text-[10px] font-normal text-neutral-400">
                  (
                  {
                    allProducts.filter(
                      (p) => cat === "All" || p.category === cat,
                    ).length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        {PRICE_RANGES.map((range) => (
          <CheckItem
            key={range.label}
            label={range.label}
            checked={selectedPriceRanges.includes(range.label)}
            onChange={() =>
              toggle(selectedPriceRanges, setSelectedPriceRanges, range.label)
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Collection">
        {COLLECTIONS.map((col) => (
          <CheckItem
            key={col}
            label={col}
            checked={selectedCollections.includes(col)}
            onChange={() =>
              toggle(selectedCollections, setSelectedCollections, col)
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => toggle(selectedColors, setSelectedColors, color)}
              title={color}
              className={`h-7 w-7 rounded-full border-2 transition-all ${
                selectedColors.includes(color)
                  ? "scale-110 border-black"
                  : "border-transparent hover:border-neutral-400"
              }`}
              style={{
                backgroundColor: COLOR_HEX[color] || "#ccc",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
        {selectedColors.length > 0 && (
          <p className="mt-2 text-[11px] text-neutral-500">
            {selectedColors.join(", ")}
          </p>
        )}
      </FilterSection>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="mt-4 text-[11px] uppercase tracking-[0.14em] text-neutral-500 underline underline-offset-4 hover:text-black"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggle(list, setList, value) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  function clearAllFilters() {
    setActiveCategory("All");
    setSearch("");
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedPriceRanges([]);
    setSortBy("featured");
  }

  useEffect(() => {
    if (!mobileFiltersOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileFiltersOpen]);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q),
      );
    }

    if (selectedCollections.length > 0) {
      result = result.filter((p) => selectedCollections.includes(p.collection));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c)),
      );
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          if (!range) return false;
          if (p.price === 0) return false;
          return p.price >= range.min && p.price < range.max;
        }),
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [
    activeCategory,
    search,
    selectedCollections,
    selectedColors,
    selectedPriceRanges,
    sortBy,
  ]);

  const activeFilterCount =
    selectedCollections.length +
    selectedColors.length +
    selectedPriceRanges.length;

  const filterProps = {
    activeCategory,
    setActiveCategory,
    selectedPriceRanges,
    setSelectedPriceRanges,
    selectedCollections,
    setSelectedCollections,
    selectedColors,
    setSelectedColors,
    activeFilterCount,
    clearAllFilters,
    toggle,
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Navbar />

      {/* Search */}
      <div className="border-b border-neutral-200 px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-16">
        <div className="relative mx-auto max-w-2xl">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 sm:left-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-black focus:bg-white sm:py-3 sm:pl-11 sm:pr-4"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-neutral-400 hover:text-black sm:right-4"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category pills — select on mobile, scrollable pills from sm up */}
      <div className="border-b border-neutral-200 bg-white">
        {/* Mobile: native select */}
        <div className="px-4 py-3 sm:hidden">
          <label htmlFor="shop-category" className="sr-only">
            Category
          </label>
          <div className="relative">
            <select
              id="shop-category"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none border border-neutral-200 bg-neutral-50 py-3 pl-4 pr-10 text-[11px] uppercase tracking-[0.14em] text-neutral-800 outline-none focus:border-black"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              ▾
            </span>
          </div>
        </div>

        {/* Tablet / desktop: horizontal pills */}
        <div className="relative hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
          <div className="overflow-x-auto px-6 py-3 [scrollbar-width:none] md:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-max min-w-full snap-x snap-mandatory gap-2 md:w-auto md:flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 border px-4 py-2 text-[10px] uppercase tracking-[0.12em] transition-colors whitespace-nowrap sm:text-[11px] sm:tracking-[0.14em] md:px-5 ${
                    activeCategory === cat
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="min-h-[60vh] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex gap-6 lg:gap-10">
            <aside className="hidden w-56 shrink-0 xl:w-60 lg:block">
              <FilterPanel {...filterProps} />
            </aside>

            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center justify-between gap-3 sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center gap-2 border border-neutral-300 px-3 py-2 text-[10px] uppercase tracking-[0.14em] hover:border-black sm:px-4 sm:text-[11px] lg:hidden"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" d="M3 6h18M7 12h10M11 18h2" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-neutral-500 sm:text-sm">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "result" : "results"}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <label
                    htmlFor="shop-sort"
                    className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 sm:text-[11px]"
                  >
                    Sort
                  </label>
                  <select
                    id="shop-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="max-w-[70%] cursor-pointer border border-neutral-200 bg-white px-2 py-2 text-[11px] outline-none transition-colors hover:border-black sm:max-w-none sm:px-3 sm:text-[12px]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div className="mb-5 flex flex-wrap gap-2 sm:mb-6">
                  {selectedCollections.map((col) => (
                    <span
                      key={col}
                      className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-[11px]"
                    >
                      {col}
                      <button
                        type="button"
                        onClick={() =>
                          toggle(
                            selectedCollections,
                            setSelectedCollections,
                            col,
                          )
                        }
                        className="text-neutral-400 hover:text-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedColors.map((color) => (
                    <span
                      key={color}
                      className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-[11px]"
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-neutral-300"
                        style={{
                          backgroundColor: COLOR_HEX[color] || "#ccc",
                        }}
                      />
                      {color}
                      <button
                        type="button"
                        onClick={() =>
                          toggle(selectedColors, setSelectedColors, color)
                        }
                        className="text-neutral-400 hover:text-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedPriceRanges.map((label) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-[11px]"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() =>
                          toggle(
                            selectedPriceRanges,
                            setSelectedPriceRanges,
                            label,
                          )
                        }
                        className="text-neutral-400 hover:text-black"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-20 text-center sm:py-32">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                    No results found
                  </p>
                  <p className="mt-3 max-w-sm text-sm text-neutral-500">
                    Try adjusting your filters or search term.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-6 border border-black px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white sm:px-8"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-4">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="flex-1 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="flex h-full w-full max-w-[min(100vw,22rem)] flex-col bg-white shadow-2xl sm:max-w-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em]">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-2xl leading-none text-neutral-400 hover:text-black"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-6">
              <FilterPanel {...filterProps} />
            </div>
            <div className="border-t border-neutral-200 p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-black py-3.5 text-[11px] uppercase tracking-[0.16em] text-white sm:py-4"
              >
                View {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
