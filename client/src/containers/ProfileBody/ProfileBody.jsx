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
        <div className="flex flex-row">
            <ProfileMenu setChoice={setChoice} />
            <div className="w-full text-lg p-6 border-l-2">
                {choice === "reviews" && <ProfileReviews />}
                {choice === "transactions" && <ProfileTransactions userID={userData._id} />}
                {choice === "cart" && <ProfileCart data={data} cart={userData.shoppingCart} />}
                {choice === "wishlist" && <ProfileWishList data={data} wishList={userData.wishList}/>}
                {choice === "settings" && <ProfileSettings userID={userData._id} phoneNumbers={userData.phoneNumbers} addresses={userData.addresses} userName={userData.username}/>}
            </div>
        </div>
    )
}

export default ProfileBody