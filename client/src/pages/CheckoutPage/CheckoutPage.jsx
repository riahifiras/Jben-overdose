import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxioxPrivate";
import axios from '../../api/axios';
import { FaPencilAlt } from "react-icons/fa";

const CheckoutPage = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const axiosPrivate = useAxiosPrivate();

  const [name, setName] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  const [editableField, setEditableField] = useState(null);

  const getUserData = async () => {
    try {
      const result = await axiosPrivate.get("/getAccountInfo", {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setUserData(result.data.accountInfo);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData.fullName) setName(userData.fullName);
    if (userData.addresses && userData.addresses.length > 0) {
      setSelectedAddress(userData.addresses[0]);
    }
    if (userData.phoneNumbers && userData.phoneNumbers.length > 0) {
      setSelectedPhone(userData.phoneNumbers[0]);
    }
  }, [userData]);

  const handleEditField = (fieldName) => {
    setEditableField(fieldName);
  };

  const handleFieldChange = (event, setter) => {
    if (event.key === "Enter") {
      setEditableField(null);
    } else {
      setter(event.target.value);
    }
  };

  const handleFieldBlur = () => {
    setEditableField(null);
  };

  const isFieldEditable = (fieldName) => {
    return editableField === fieldName;
  };

  const handleSubmit = async () => {
    try {
      const addTransaction = await axios.post('/addtransaction',{
        cakes: userData.shoppingCart,
        userID: userData._id,
        name: name,
        address: selectedAddress,
        phoneNumber: selectedPhone,
        total: data
      }, {headers: {
        'Content-Type': 'application/json'
      }});
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className='mx-auto flex justify-center items-start mt-16 gap-6'>
      <div className="flex flex-col p-6 rounded-sm gap-12 border-2" style={{ width: "800px" }}>
        <h1 className="text-4xl font-semibold">Verify your information</h1>
        <div className="flex flex-row text-xl items-center gap-2">
          <label className="w-40" htmlFor="name">
            Name:
          </label>
          <input
            className={`h-10 border-2 rounded-lg px-2 flex items-center ${isFieldEditable("name") ? "bg-transparent" : "bg-slate-100"}`}
            style={{ width: "520px" }}
            type="text"
            name="name"
            disabled={!isFieldEditable("name")}
            value={name}
            onChange={(event) => handleFieldChange(event, setName)}
            onBlur={handleFieldBlur}
            onKeyDown={(event) => event.key === "Enter" && handleFieldChange(event, setName)}
          />
          {!isFieldEditable("name") && (
            <button className="text-gray-500" onClick={() => handleEditField("name")}>
              <FaPencilAlt />
            </button>
          )}
        </div>
        <div className="flex flex-row text-xl items-center gap-2">
          <label className="w-40" htmlFor="address">
            Address:
          </label>
          <select
            className="h-10 border-2 rounded-lg px-2"
            style={{ width: "520px" }}
            name="address"
            value={selectedAddress}
            onChange={(event) => setSelectedAddress(event.target.value)}
          >
            {userData.addresses &&
              userData.addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-row text-xl items-center gap-2">
          <label className="w-40" htmlFor="phone">
            Phone number:
          </label>
          <select
            className="h-10 border-2 rounded-lg px-2"
            style={{ width: "520px" }}
            name="phone"
            value={selectedPhone}
            onChange={(event) => setSelectedPhone(event.target.value)}
          >
            {userData.phoneNumbers &&
              userData.phoneNumbers.map((phoneNumber, index) => (
                <option key={index} value={phoneNumber}>
                  {phoneNumber}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col p-6 rounded-sm justify-between border-2 w-80 h-80'>
        <h1 className='text-2xl flex justify-between'><span>Total:</span><span>${data}</span></h1>
        <div className='flex flex-col gap-4'>
          <button onClick={handleSubmit} className='flex justify-center items-center bg-color5 duration-150 hover:bg-color6 text-white p-2 rounded-md shadow-md cursor-pointer'>Confirm purchase</button>
          <button onClick={() => navigate("/shop")} className='flex justify-center items-center bg-gray-500 duration-150 hover:bg-gray-400 text-white p-2 rounded-md shadow-md cursor-pointer'>Back to shop</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;
