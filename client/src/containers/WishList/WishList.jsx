
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"
import axios from "axios";
import WishListItem from "../../components/WishListItem/WishListItem";

const WishList = () => {

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


    // const wishListData = JSON.parse(localStorage.getItem("wishList") || "[]");
    // const ids = wishListData?.map(item => item.id) || [];
    // const tempArr = data.filter(item => ids.includes(item._id));

    const [displayOn, setDisplayOn] = useState(false);
    const [wishListItems, setWishListItems] = useState([]);

    const find = () => {
        fetchData();
        try {
            const wishListData = JSON.parse(localStorage.getItem("wishList") || "[]");
            const ids = wishListData?.map(item => item.id) || [];
            const tempArr = data.filter(item => ids.includes(item._id));
            const updatedWishListItems = tempArr.map(item => {
                const matchingWishList = wishListData.find(wishList => wishList.id === item._id);
                return matchingWishList ? { ...item, quantity: matchingWishList.quantity } : item;
            });
            setWishListItems(updatedWishListItems);
        } catch (error) {
            setWishListItems([]);
        }


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



    return (
        <div
            onMouseDown={handleClick}
            className="relative inline-block"
        >
            <FaHeart />
            <div
                style={{ width: '500px' }}
                className={displayOn ? "absolute flex flex-col max-h-96 overflow-auto -translate-x-60 translate-y-2 cursor-default z-20 bg-white border-2 p-2 rounded-lg" : "hidden"}
                onMouseDown={handleMenuClick}
            >
                <div className="">
                    <div className="flex flex-row justify-between px-2">
                        <h1>Items: {wishListItems.length}</h1>
                    </div>
                </div>
                <ul>
                    {wishListItems.map(({ _id, title, price, picture }) => {
                        return <WishListItem key={_id} id={_id} title={title} picture={picture} price={price} />;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default WishList