import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "../types/types";
import { transformImage } from "../utils/features";

type cartItemProps = {
  cartItem: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};

function CartItem({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: cartItemProps) {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img
        src={transformImage(`${import.meta.env.VITE_SERVER}${photo}`)}
        alt={name}
      />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;
