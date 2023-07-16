
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"
import CartItem from "../../components/CartItem/CartItem";

const Cart = ({ data, setData }) => {

  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const ids = cartData?.map(item => item.id) || [];
  const tempArr = data.filter(item => ids.includes(item._id));

  const [displayOn, setDisplayOn] = useState(false);
  const [cartItems, setCartItems] = useState(tempArr);

  const find = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    const ids = cartData?.map(item => item.id) || [];
    const tempArr = data.filter(item => ids.includes(item._id));
    console.log(cartItems);
    if (tempArr.length == cartItems.length){
    }
    else{
      setCartItems(tempArr);
      console.log("yes");
    }
    
  };
  


  useEffect(() => {
    find();
    console.log("haa");
  }, [data, cartItems])

  const handleClick = () => {
    setDisplayOn(!displayOn);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

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
            <h1>Total: $199.92</h1>
          </div>
          <div className="float-right flex justify-center items-center bg-color5 duration-150 hover:bg-color6 text-white p-2 my-4 rounded-md shadow-md cursor-pointer">Proceed to checkout</div>
        </div>
        <ul>
          {cartItems.map(({ _id, title, price, picture }) => {
            return <CartItem key={_id} id={_id} title={title} picture={picture} price={price} cartItems={cartItems} setCartItems={setCartItems} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Cart