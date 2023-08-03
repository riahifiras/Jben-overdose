import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileBody from '../../containers/ProfileBody/ProfileBody';
import Header from "../../containers/Header/Header"
import { placeHolderProfileImage } from '../../Images';
import useAxiosPrivate from "../../hooks/useAxioxPrivate"
import axios from 'axios';

const Profile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [cakes, setCakes] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const fetchData = async () => {
        try {
          let res = "";
          res = await axios.get("http://localhost:3000/getCakes");
          
          setCakes(res.data.Cakes)
        } catch (error) {
          console.log("Error: ", error);
        }
      }

    const getUserData = async () => {
        try {
            const result = await axiosPrivate.get("/getAccountInfo");
            console.log(result.data.accountInfo);
            setUserData(result.data.accountInfo);
        } catch (error) {
            console.log("Error: ", error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    useEffect(() => {
        fetchData();
        getUserData();
    }, [])


    return (
        <div>
            <Header />
            <div className='mt-8 border-2 mx-auto w-8/12'>
                <ProfileHeader name={userData.fullName} image={userData.profilePic ? userData.profilePic : placeHolderProfileImage} />
                <ProfileBody userData={userData} data={cakes}/>
            </div>
        </div>
    )
}

export default Profile