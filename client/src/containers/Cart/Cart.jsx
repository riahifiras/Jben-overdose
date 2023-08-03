
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";

const Cart = () => {

  const { auth } = useAuth();
  const navigate  = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      let res = "";
      res = await axios.get("http://localhost:3000/getCakes");
      setIsLoading(false);
      setData(res.data.Cakes)
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  }


  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const ids = cartData?.map(item => item.id) || [];
  const tempArr = data.filter(item => ids.includes(item._id));

  const [displayOn, setDisplayOn] = useState(false);
  const [cartItems, setCartItems] = useState(tempArr);

  const find = () => {
    fetchData();
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    const ids = cartData?.map(item => item.id) || [];
    const tempArr = data.filter(item => ids.includes(item._id));
    const updatedCartItems = tempArr.map(item => {
      const matchingCartItem = cartData.find(cartItem => cartItem.id === item._id);
      return matchingCartItem ? { ...item, quantity: matchingCartItem.quantity } : item;
    });
    setCartItems(updatedCartItems);
    
  };
  


  useEffect(() => {
    find();
  }, [displayOn])

  const handleClick = () => {
    setDisplayOn(!displayOn);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

  const totalPrice = (cartItems) => {
    let sum = 0;
    for(let item of cartItems){
      sum += item.price*item.quantity;
    }
    return sum;
  }

  return (
    <div
      onMouseDown={handleClick}
      className="relative inline-block"
    >
      <FaShoppingCart />
      <div
        style={{ width: '500px' }}
        className={displayOn ? "absolute flex flex-col max-h-96 overflow-auto -translate-x-60 translate-y-2 cursor-default z-20 bg-white border-2 p-2 rounded-lg" : "hidden"}
        onMouseDown={handleMenuClick}
      >
        <div className="">
          <div className="flex flex-row justify-between px-2">
            <h1>Items: {cartItems.length}</h1>
            <h1>Total: ${totalPrice(cartItems)}</h1>
          </div>
          <Link to='/checkout' state={totalPrice(cartItems)} className="float-right flex justify-center items-center bg-color5 duration-150 hover:bg-color6 text-white p-2 my-4 rounded-md shadow-md cursor-pointer">Proceed to checkout</Link>
        </div>
        <ul>
          {cartItems.map(({ _id, title, price, picture, quantity }) => {
            return <CartItem key={_id} id={_id} title={title} picture={picture} price={price} quan={quantity} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Cart