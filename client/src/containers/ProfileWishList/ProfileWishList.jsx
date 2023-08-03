import { useEffect, useState } from "react";
import axios from "axios";
import WishListItem from "../../components/WishListItem/WishListItem";

const ProfileWishList = ({wishList, data}) => {





  const whishListData = wishList;
  const ids = whishListData?.map(item => item.id) || [];
  const tempArr = data.filter(item => ids.includes(item._id));

  const [wishListItems, setWishListItems] = useState(tempArr);

  const find = () => {
    const whishListData = wishList;
    const ids = whishListData?.map(item => item.id) || [];
    const tempArr = data.filter(item => ids.includes(item._id));
    const updatedWishListItems = tempArr.map(item => {
      const matchingWishList = whishListData.find(wishList => wishList.id === item._id);
      return matchingWishList ? { ...item, quantity: matchingWishList.quantity } : item;
    });
    setWishListItems(updatedWishListItems);

  };



  useEffect(() => {
    find();
  }, [data])

  return (
    <div>
      <ul>
        {wishListItems.map(({ _id, title, price, picture }) => {
          return <WishListItem key={_id} id={_id} title={title} picture={picture} price={price} />;
        })}
      </ul>
    </div>
  )
}

export default ProfileWishList