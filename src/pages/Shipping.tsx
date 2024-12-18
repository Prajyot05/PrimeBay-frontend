import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

function Shipping() {
    const {cartItems, coupon} = useSelector((state: RootState) => state.cartReducer);
    const { user } = useSelector((state: RootState) => state.userReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [shippingInfo, setShippingInfo] = useState({
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));

        try {
            const {data} = await axios.post(`${server}/api/v1/payment/create?id=${user?._id}`, 
            {
                items: cartItems,
                shippingInfo,
                coupon,
            }, 
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            navigate("/pay", {
                state: data.clientSecret
            });

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    useEffect(() => {
        if(cartItems.length <= 0) return navigate("/cart");
    }, [cartItems]);

  return (
    <div className="shipping">
        <button className="back-btn" onClick={() => navigate("/cart")}><BiArrowBack /></button>
        <form onSubmit={submitHandler}>
            <h1>Shipping Details</h1>
            <input required type="number" placeholder="Phone Number (+91)" name="phone" value={shippingInfo.phone} onChange={changeHandler} />
            <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
            <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} />
            <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler} />
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Choose Country</option>
                <option value="india">India</option>
            </select>
            <input required type="number" placeholder="Pin Code" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} />
            

            <button type="submit">Pay Now</button>
        </form>
    </div>
  )
}

export default Shipping