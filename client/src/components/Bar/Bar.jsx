import { useState } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cart from "../../containers/Cart/Cart";
import WishList from "../../containers/WishList/WishList";

const Bar = ({data, setData}) => {
  // const navigate = useNavigate();
  // const location = useLocation();

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
            <Link to="/profile">profile</Link>
            <button><WishList data={data} setData={setData} /></button>
            <button><Cart data={data} setData={setData} /></button>
        </div>
    </div>
  )
}

export default Bar