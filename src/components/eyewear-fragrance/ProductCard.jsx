import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({
  item,
  backPath,
  backLabel,
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Convert API data to the structure used by your app
  const product = {
    id: item.id,
    title: item.title,
    img:item.images?.[0],
    price: item.price,
    desc:item.description,
  };

  const goToDetail = () => {
    navigate("/product", {
      state: {
        product,
        backPath,
        backLabel,
      },
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(product);
  };

  return (
    <article
      onClick={goToDetail}
      className="group flex cursor-pointer flex-col overflow-hidden border border-gray-200 bg-white transition duration-300 hover:shadow-lg"
    >
  
      <div className="overflow-hidden bg-gray-100">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

  

      <div className="flex flex-1 flex-col p-5">

      

        <p className="flex-1 text-sm leading-7 text-gray-600">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-medium">
            {item.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="border border-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:bg-black hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}