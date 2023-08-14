import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ setChoice }) => {

    const logout = useLogout();
    const navigate = useNavigate();
    
    const signout = async () => {
        await logout();
        navigate('/shop');
    }

    return (
        <div className="flex flex-col justify-start items-center w-2/5 h-full">
            <button onClick={() => setChoice("reviews")} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Recent reviews</button>
            <button onClick={() => setChoice("transactions")} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Previous transactions</button>
            <button onClick={() => setChoice("cart")} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Cart</button>
            <button onClick={() => setChoice("wishlist")} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Wish list</button>
            <button onClick={() => setChoice("settings")} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Settings</button>
            <button onClick={signout} className="text-lg w-full h-14 flex justify-center items-center hover:bg-slate-200">Sign out</button>
        </div>
    )
}

export default ProfileMenu