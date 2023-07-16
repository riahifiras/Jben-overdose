import { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"

const CartItem = ({ id, picture, title, price, CartItems, setCartItems }) => {

    const [quantity, setQuantity] = useState(1)

    const findElementById = (array, id) => array.find((element) => element.id === id);

    const handleChange = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <>
        <hr />
        <div className="flex flex-row justify-between px-2 items-center">
            <img src={picture} alt="cake" className="w-16 h-16 object-cover" />
            <h1 className="text-sm w-32 font-semibold text-center hover:underline hover:cursor-pointer" onClick={() => window.location.href = `/product/${id}`}>{title}</h1>
            <h1 className="text-sm">${price}</h1>
            <div className="flex flex-row justify-center items-center gap-1">
            <label htmlFor="quantity" className="text-sm">Quantity: </label>
            <input onChange={handleChange} value={quantity} type="number" name="quantity" className="text-sm w-10 h-8 rounded-md border-2 outline-none px-1" />
            </div>
            <div className="w-7 h-7 flex justify-center items-center rounded-md shadow-md text-sm bg-red-600 hover:bg-red-500 duration-150 text-white cursor-pointer"><FaTrashAlt/></div>
        </div>
        
        </>
        
    )
}

export default CartItem