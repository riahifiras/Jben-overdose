import { FaTrashAlt } from "react-icons/fa"

const WishList = ({ id, picture, title, price }) => {
    

    const deleteItem = (id) => {
        const cartData = JSON.parse(localStorage.getItem("wishList") || "[]");
        localStorage.setItem("wishList", JSON.stringify(cartData.filter(item => item.id !== id)))
    }

    const addToCart = () => {
        let arr = (localStorage.getItem("cart"))? JSON.parse(localStorage.getItem("cart")): [];
        if(!arr.some(item => item.id === id)){
          arr.push({id: id , quantity: 1});
        }
        else{
          const existingItemIndex = arr.findIndex(item => item.id === id);
          arr[existingItemIndex].quantity++;
        }
        localStorage.setItem("cart", JSON.stringify(arr));
      }

    return (
        <>
        <hr />
        <div className="flex flex-row justify-between px-2 items-center">
            <img src={picture} alt="cake" className="w-16 h-16 object-cover" />
            <h1 className="text-sm w-32 font-semibold text-center hover:underline hover:cursor-pointer" onClick={() => window.location.href = `/product/${id}`}>{title}</h1>
            <h1 className="text-sm">${price}</h1>
            <div className="flex flex-row justify-center items-center gap-1">
            </div>
            <div onClick={addToCart} className="w-24 h-7 flex justify-center items-center rounded-md shadow-md text-sm bg-color5 hover:bg-color6 duration-150 text-white cursor-pointer">Add to cart</div>
            <div onClick={() => deleteItem(id)} className="w-7 h-7 flex justify-center items-center rounded-md shadow-md text-sm bg-red-600 hover:bg-red-500 duration-150 text-white cursor-pointer"><FaTrashAlt/></div>
        </div>
        
        </>
        
    )
}

export default WishList