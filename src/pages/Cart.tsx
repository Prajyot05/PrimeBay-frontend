import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, applyDiscount, calculatePrice, removeCartItem, saveCoupon } from "../redux/reducer/cartReducer";
import { CartItem as CartItemType } from "../types/types";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState, server } from "../redux/store";

function Cart() {
  const {cartItems, subTotal, tax, total, shippingCharges, discount} = useSelector((state: RootState) => state.cartReducer);
  const isOrderAvailable = useSelector((state: RootState) => state.globalOrder.globalOrderStatus);

  const dispatch = useDispatch();
  const [couponCode, setCounponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCounponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItemType) => {
    if(cartItem.quantity >= cartItem.stock) return toast.error("No more stock left.");
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
  };

  const decrementHandler = (cartItem: CartItemType) => {
    if(cartItem.quantity <= 1) return;
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const {token: cancelToken, cancel} = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {cancelToken})
      .then(res => {
        dispatch(applyDiscount(res.data.discount));
        dispatch(saveCoupon(couponCode));
        setIsValidCounponCode(true);
        dispatch(calculatePrice());    
      })
      .catch(() => {
        dispatch(applyDiscount(0));
        setIsValidCounponCode(false);
        dispatch(calculatePrice());
      });

      if(Math.random() > 0.5) setIsValidCounponCode(true);
      else setIsValidCounponCode(false);
    }, 1000)

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCounponCode(false);
    }
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());    
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i, idx) => <CartItem incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} key={idx} cartItem={i} />) : <h1>No Items Added</h1>
        }
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Platform fee: ₹{tax}</p>
        <p>Discount: <em className="red"> - ₹{discount}</em></p>
        <p><b>Total: ₹{total}</b></p>
        <input type="text" placeholder="Coupon Code" value={couponCode} onChange={e => setCounponCode(e.target.value)} />
        {
          couponCode && (
            isValidCouponCode ? <span className="green">₹{discount} off using 
            <code> {couponCode}</code></span> : <span className="red">Invalid Coupone Code <VscError /> </span>
          )
        }
        {
          cartItems.length > 0 && (
            isOrderAvailable ? (
            <Link to={"/shipping"}>Checkout</Link>
            ) : (
              <Link style={{backgroundColor: 'grey', pointerEvents: 'none'}} to={"#"}>Checkouts Currently Not Available</Link>
            )
          )
        }
      </aside>
    </div>
  )
}

export default Cart