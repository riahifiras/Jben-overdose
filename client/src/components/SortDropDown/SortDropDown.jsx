import { useState } from "react";
import { FaArrowDown } from 'react-icons/fa'


const SortDropDown = () => {

  const [displayOn, setDisplayOn] = useState(false);
  const [sortState, setSortState] = useState("Newest")

  const toggleDisplay = () => {
    setDisplayOn(!displayOn);
  }

  const handleClick = (e) => {
    setSortState(e.target.innerText);
    toggleDisplay();
  }

  return (
    <div className="relative inline-block">
        <button onClick={toggleDisplay} className="border-2 p-1 px-4 flex justify-center items-center gap-5 w-56">{sortState}<FaArrowDown/></button>
        <ul className={displayOn ? 'flex flex-col shadow-md absolute z-10' : 'hidden absolute z-10'}>
            <li onClick={handleClick} className="bg-white border-2 px-4 py-2 w-56 flex justify-center items-center cursor-pointer hover:bg-slate-200">Newest</li>
            <li onClick={handleClick} className="bg-white border-2 px-4 py-2 w-56 flex justify-center items-center cursor-pointer hover:bg-slate-200">Popularity</li>
            <li onClick={handleClick} className="bg-white border-2 px-4 py-2 w-56 flex justify-center items-center cursor-pointer hover:bg-slate-200">Best rating</li>
            <li onClick={handleClick} className="bg-white border-2 px-4 py-2 w-56 flex justify-center items-center cursor-pointer hover:bg-slate-200">Highest price</li>
            <li onClick={handleClick} className="bg-white border-2 px-4 py-2 w-56 flex justify-center items-center cursor-pointer hover:bg-slate-200">Lowest price</li>
        </ul>
    </div>
  )
}

export default SortDropDown