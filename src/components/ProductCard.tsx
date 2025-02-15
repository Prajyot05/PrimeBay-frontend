import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { transformImage } from "../utils/features";

type ProductsProps = {
  productId: string;
  photos: {
    url: string;
    key: string;
  }[];
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
  return (
    <div className="product-card">
      <img src={transformImage(photos[0]?.url, 600)} alt={name} />
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
              photo: photos[0].url,
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
