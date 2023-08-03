import { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";

const ProfileCart = ({ cart, data }) => {


  const cartData = cart;
  const ids = cartData?.map(item => item.id) || [];
  const tempArr = data.filter(item => ids.includes(item._id));

  const [cartItems, setCartItems] = useState(tempArr);

  const find = () => {
    const cartData = cart;
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
  }, [data])

  return (
    <div><ul>
      {cartItems.map(({ _id, title, price, picture, quantity }) => {
        return <CartItem key={_id} id={_id} title={title} picture={picture} price={price} quan={quantity} />;
      })}
    </ul></div>
  )
}

export default ProfileCart