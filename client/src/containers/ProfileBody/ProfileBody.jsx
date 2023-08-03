import { useState } from "react"

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu"
import ProfileCart from "../ProfileCart/ProfileCart"
import ProfileReviews from "../ProfileReviews/ProfileReviews"
import ProfileSettings from "../ProfileSettings/ProfileSettings"
import ProfileTransactions from "../ProfileTransactions/ProfileTransactions"
import ProfileWishList from "../ProfileWishList/ProfileWishList"

const ProfileBody = ({ userData, data }) => {
    const [choice, setChoice] = useState("reviews");

    return (
        <div className="flex flex-row h-96">
            <ProfileMenu setChoice={setChoice} />
            <div className="w-full text-lg p-6">
                {choice === "reviews" && <ProfileReviews />}
                {choice === "transactions" && <ProfileTransactions userID={userData._id} />}
                {choice === "cart" && <ProfileCart data={data} cart={userData.shoppingCart} />}
                {choice === "wishlist" && <ProfileWishList data={data} wishList={userData.wishList}/>}
                {choice === "settings" && <ProfileSettings />}
            </div>
        </div>
    )
}

export default ProfileBody