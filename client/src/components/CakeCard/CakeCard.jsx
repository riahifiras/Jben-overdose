import { FaShoppingCart, FaRegHeart, FaHeart } from "react-icons/fa"

const CakeCard = ({id, picture, title, price}) => {

  const handleClick = () => {
    window.location.href = `/product/${id}`
  }

  return (
    <div className="p-6 flex flex-col border-2 shadow-md justify-around items-center" style={{height: '500px'}}>
        <img src={`${picture}`} alt="title" className="w-64 h-64 object-cover"/>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-semibold text-center hover:underline hover:cursor-pointer" onClick={handleClick}>{title}</h1>
          <h1>${price}</h1>
        </div>
        <div className="flex flex-row w-11/12 justify-between items-center">
          <button className="flex justify-center items-center w-44  h-10 bg-color5 text-white px-6"><span className="mr-4"><FaShoppingCart /></span><span>Add to cart</span></button>
          <button className="text-red-600 text-xl h-10 w-10 flex justify-center items-center bg-white border-2 rounded-sm"><FaRegHeart /></button>
        </div>
    </div>
  )
}

export default CakeCard