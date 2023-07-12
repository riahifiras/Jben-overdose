import { useState } from "react"
import { FaShoppingCart, FaHeart } from "react-icons/fa"

const Bar = () => {

  const [ info, setInfo] = useState("");

  const handleChange = (e) => {
    setInfo(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.key == "Enter"){
      window.location.href = `/shop/${info}`;
    }
  }

  return (
    <div className="flex flex-row justify-between items-center w-10/12">
        <input type="text" name="search" id="search" value={info} onKeyDown={handleKeyDown} onChange={handleChange} className="h-16 border-2 outline-none p-2 rounded-sm text-xl" style={{width: '600px'}} placeholder="Search..."/>
        <div className="flex flex-row gap-6 items-center text-xl">
            <button>profile</button>
            <button><FaHeart /></button>
            <button><FaShoppingCart /></button>
        </div>
    </div>
  )
}

export default Bar