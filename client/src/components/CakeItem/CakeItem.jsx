import { FaShoppingCart, FaRegHeart, FaHeart } from "react-icons/fa"

const CakeItem = ({ id, picture, title, price }) => {

  const handleClick = () => {
    window.location.href = `/product/${id}`
  }

  const addToCart = () => {
    let arr = (localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
    if (!arr.some(item => item.id === id)) {
      arr.push({ id: id, quantity: 1 });
    }
    else{
      const existingItemIndex = arr.findIndex(item => item.id === id);
      arr[existingItemIndex].quantity++;
    }
    console.log(localStorage.getItem("cart"));
    localStorage.setItem("cart", JSON.stringify(arr));
  }

  const addToWishList = () => {
    let arr = (localStorage.getItem("wishList")) ? JSON.parse(localStorage.getItem("wishList")) : [];
    if (!arr.some(item => item.id === id)) {
      arr.push({ id: id });
    }
    console.log(localStorage.getItem("wishList"));
    localStorage.setItem("wishList", JSON.stringify(arr));
  }

  return (
    <div className="p-6 flex flex-row border-2 justify-around items-center">
      <img src={`${picture}`} alt="title" className="w-40 h-40 object-cover" />
      <h1 className="text-xl w-80 font-semibold text-center hover:underline hover:cursor-pointer" onClick={handleClick}>{title}</h1>
      <h1>${price}</h1>
      <div className="flex flex-row justify-between items-center gap-1">
        <button onClick={addToCart} className="flex justify-center items-center w-44  h-10 rounded-md bg-color5 hover:bg-color6 duration-150 text-white px-6"><span className="mr-4"><FaShoppingCart /></span><span>Add to cart</span></button>
        <button onClick={addToWishList} className="text-red-600 text-xl h-10 w-10 flex justify-center items-center bg-white border-2 rounded-md"><FaRegHeart /></button>
      </div>
    </div>
  )
}

export default CakeItem