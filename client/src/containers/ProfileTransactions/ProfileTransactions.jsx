import { useState, useEffect } from "react"
import axios from "../../api/axios"

const ProfileTransactions = (userID) => {

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      let res = await axios.get(`/gettransactionbyid/${userID.userID}`)
      console.log(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return (
    <div>ProfileTransactions</div>
  )
}

export default ProfileTransactions