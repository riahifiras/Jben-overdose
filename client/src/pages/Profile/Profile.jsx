import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileBody from '../../containers/ProfileBody/ProfileBody';
import Header from "../../containers/Header/Header"
import { placeHolderProfileImage } from '../../Images';
import useAxiosPrivate from "../../hooks/useAxioxPrivate"

const Profile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const getData = async () => {
        try {
            const result = await axiosPrivate.get("/getAccountInfo");

            setData(result.data.accountInfo);
        } catch (error) {
            console.log("Error: ", error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <Header />
            <div className='mt-8 border-2 mx-auto w-8/12'>
                <ProfileHeader name={data.fullName} image={data.profilePic ? data.profilePic : placeHolderProfileImage} />
                <ProfileBody/>
            </div>
        </div>
    )
}

export default Profile