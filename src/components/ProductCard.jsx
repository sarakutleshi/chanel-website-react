

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const price =
    product.price === 0 ? "On request" : `$${product.price.toLocaleString()}`;

  function go() {
    navigate("/product", {
      state: { product, backPath: "/home", backLabel: "Home" },
    });
  }

  function handleAdd(e) {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      img: product.img,
      price,
      category: product.category,
      desc: product.desc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article
      onClick={go}
      className="group cursor-pointer flex-shrink-0 w-[260px] md:w-[300px]"
    >
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
              added
                ? "bg-neutral-700 text-white"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {added ? "✓ Added" : "Add to Bag"}
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-0.5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {product.subcategory}
        </p>
        <p className="text-[13px] font-medium text-neutral-900">
          {product.name}
        </p>
        <p className="text-[13px] font-light text-neutral-500">{price}</p>
      </div>
    </article>
  );
}