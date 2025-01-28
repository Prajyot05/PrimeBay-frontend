import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { transformImage } from "../utils/features";

type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  category: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

function ProductCard({
  productId,
  photos,
  name,
  category,
  price,
  stock,
  handler,
}: ProductsProps) {
  if (!photos) return;
  // const finalPhoto =
  //   typeof photos[0] === "string"
  //     ? (photos[0] as string)
  //     : (photos[0] as { url: string }).url;

  return (
    <div className="product-card">
      {/* <img src={transformImage(photos[0]?.url, 600)} alt={name} /> */}
      <img
        src={`${transformImage(`${import.meta.env.VITE_SERVER}${photos[0]}`)}`}
        alt={name}
      />
      <div className="product-card-name-category">
        <p>{name}</p>
        <code>{category}</code>
      </div>
      <span>₹{price}</span>
      <div className="product-card-links">
        <button
          onClick={() =>
            handler({
              productId,
              photo: photos[0],
              name,
              price,
              stock,
              quantity: 1,
            })
          }
        >
          <FaPlus />
        </button>
        <Link to={`/product/${productId}`}>
          <FaExpandAlt />
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
