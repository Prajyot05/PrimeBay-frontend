import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.tsx'
import { useLatestProductsQuery } from '../redux/api/productAPI.ts'
import toast from 'react-hot-toast';
import { Skeleton } from '../components/Loader.tsx';
import { CartItem } from '../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducer/cartReducer.ts';
import HomeCarousel from '../components/HomeCarousel.tsx';
import Footer from '../components/Footer.tsx';
import { RootState } from '../redux/store.ts';

function Home() {
  const { data, isError, isLoading } = useLatestProductsQuery("");
  const globalOrderingAllowed = useSelector((state: RootState) => state.globalOrder.globalOrderStatus);
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if(!globalOrderingAllowed) return toast.error("Orders Have Been Stopped");
    if(cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Item added to Cart");
  };

  if(isError) toast.error("Cannot fetch the Products");

  return (
    <div className='home'>
      <section>
        <HomeCarousel />
      </section>
      {/* Additional layer below the header */}
      {/* <div style={{
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
       Orders can be placed after 6 PM
      </div> */}
      <h1>Latest Products
        <Link to={"/search"} className='findmore'>More</Link>
      </h1>

      <main>
        <div className='latest-products-container'>
          { isLoading ? <Skeleton width='80vw' /> :
            data?.products.map((i) => (
              <ProductCard 
                key={i._id}
                productId={i._id} 
                name={i.name}
                category={i.category}
                price={i.price} 
                stock={i.stock} 
                photos={i.photos} 
                handler={addToCartHandler} 
              />
            ))
          }
        </div>
        {
          !globalOrderingAllowed && (
            <div className="order-not-allowed">
              <h2>Orders Are Currently Not Being Accepted</h2>
            </div>
          )
        }
        <Footer />
      </main>
    </div>
  )
}

export default Home