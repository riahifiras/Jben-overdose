import { useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import bcrypt from 'bcryptjs';
import axios from "../../api/axios"

const ProfileSettings = ({ phoneNumbers, addresses, userID, userName }) => {

  const [phoneNumberList, setPhoneNumberList] = useState(phoneNumbers);
  const [addressList, setAddressList] = useState(addresses);

  const [numberToAdd, setNumberToAdd] = useState("");
  const [addressToAdd, setAddressToAdd] = useState("");

  const [enabledPhoneInputIndex, setEnabledPhoneInputIndex] = useState();
  const [enableAddressInputIndex, setEnableAddressInputIndex] = useState();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handlePhoneNumberChange = (index, newValue) => {
    const updatedNumbers = [...phoneNumberList];
    updatedNumbers[index] = newValue;
    setPhoneNumberList(updatedNumbers);
  };

  const handleAddressChange = (index, newValue) => {
    const updatedAddresses = [...addressList];
    updatedAddresses[index] = newValue;
    setAddressList(updatedAddresses);
  };

  const handleSubmit = async (toUpdate, e = null) => {
    let newData = {};
    let oldPasswordState;
    switch (toUpdate) {
      case "phoneNumbers":
        newData = {
          phoneNumbers: phoneNumberList
        }
        break;
      case "addresses":
        newData = {
          addresses: addressList
        }
        break;
      case "password":
        e.preventDefault();
        try {
          oldPasswordState = await axios.post('/checkpassword',
          { identifier: userName, password: oldPassword })
        } catch (error) {
          console.log("error", error);
        }

        console.log(oldPasswordState);
        if (oldPasswordState.data.currentUser === false) {
          setPasswordError("wrong password");
          return 0;
        } else if (newPassword.length < 8) {
          setPasswordError('Password should be at least 8 characters long.');
          return 0;
        } else if (!/\d/.test(newPassword)) {
          setPasswordError('Password should contain at least one number.');
          return 0;
        } else if (!/[a-zA-Z]/.test(newPassword)) {
          setPasswordError('Password should contain at least one letter.');
          return 0;
        } else if (newPassword !== confirmNewPassword) {
          setPasswordError("passwords don't match");
          return 0;
        }
        else {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          newData = {
            password: hashedPassword
          }
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
        break;

      default:
        break;
    }
    try {
      const response = await axios.put(`/setAccountInfo/${userID}`, newData)
      return response;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-2xl font-semibold py-6">phone numbers: </h1>
        <ul className="flex flex-col gap-3">
          {phoneNumberList !== null ? phoneNumberList.map((number, index) => {
            return (
              <li key={index} className="flex gap-4 items-center">
                <input
                  className={enabledPhoneInputIndex === index ? "outline-non border-2 rounded-md p-2 w-60 h-11 border-color5" : "outline-non border-2 rounded-md p-2 w-60 h-11"}
                  type="text"
                  value={number}
                  onChange={(event) => { handlePhoneNumberChange(index, event.target.value) }}
                  onKeyDown={(e) => e.key === 'Enter' ? setEnabledPhoneInputIndex(null) : ""}
                  disabled={enabledPhoneInputIndex !== index}
                />
                <span className="text-gray-400 cursor-pointer" onClick={() => setEnabledPhoneInputIndex(index)}><FaPencilAlt /></span>
                <span onClick={() => setPhoneNumberList(phoneNumberList.filter((number, i) => {
                  return index !== i;
                }))} className="text-gray-400 cursor-pointer"><FaTrashAlt /></span>
              </li>
            );
          }) : <></>}
          <li className={phoneNumberList.length < 5 ? "flex gap-4 items-center" : "hidden"}>
            <input onChange={(e) => setNumberToAdd(e.target.value)} className="outline-none focus:border-color5 border-2 rounded-md p-2 w-60 h-11" type="text" value={numberToAdd} />
            <span onClick={
              () => {
                setPhoneNumberList([...phoneNumberList, numberToAdd]);
                setNumberToAdd("");
              }
            }
              className="text-gray-400 cursor-pointer" >
              <FaPlus />
            </span>
          </li>
        </ul>
        {phoneNumberList !== phoneNumbers ? <div className="flex gap-2 float-right">
          <button onClick={() => handleSubmit("phoneNumbers")} className="w-40 h-11 flex justify-center items-center rounded-md text-lg duration-200 text-white bg-color5 hover:bg-color6">save changes</button>
          <button onClick={() => setPhoneNumberList(phoneNumbers)} className="w-32 h-11 flex justify-center items-center rounded-md text-lg duration-200 text-black bg-gray-300 hover:bg-gray-400">Cancel</button>
        </div> : <></>}
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-2xl font-semibold py-6">addresses: </h1>
        <ul className="flex flex-col gap-3">
          {addressList !== null ? addressList.map((address, index) => {
            return (
              <li key={index} className="flex gap-4 items-center">
                <input
                  className={enableAddressInputIndex === index ? "border-color5 outline-none border-2 rounded-md p-2 w-80 h-11" : "outline-none border-2 rounded-md p-2 w-80 h-11"}
                  type="text"
                  value={address}
                  onChange={(event) => { handleAddressChange(index, event.target.value) }}
                  onKeyDown={(e) => e.key === 'Enter' ? setEnableAddressInputIndex(null) : ""}
                  disabled={enableAddressInputIndex !== index}
                />
                <span className="text-gray-400 cursor-pointer" onClick={() => setEnableAddressInputIndex(index)}><FaPencilAlt /></span>
                <span onClick={() => setAddressList(addressList.filter((number, i) => {
                  return index !== i;
                }))} className="text-gray-400 cursor-pointer"><FaTrashAlt /></span>
              </li>
            );
          }) : <div></div>}
          <li className={addressList.length < 5 ? "flex gap-4 items-center" : "hidden"}>
            <input onChange={(e) => setAddressToAdd(e.target.value)} className="outline-none focus:border-color5 border-2 rounded-md p-2 w-60 h-11" type="text" value={addressToAdd} />
            <span onClick={
              () => {
                setAddressList([...addressList, addressToAdd]);
                setAddressToAdd("");
              }
            }
              className="text-gray-400 cursor-pointer" >
              <FaPlus />
            </span>
          </li>
        </ul>
        {addressList !== addresses ? <div className="flex gap-2 float-right">
          <button onClick={() => handleSubmit("addresses")} className="w-40 h-11 flex justify-center items-center rounded-md text-lg duration-200 text-white bg-color5 hover:bg-color6">save changes</button>
          <button onClick={() => setAddressList(addresses)} className="w-32 h-11 flex justify-center items-center rounded-md text-lg duration-200 text-black bg-gray-300 hover:bg-gray-400">Cancel</button>
        </div> : <></>}
      </div>
      <form onSubmit={(e) => handleSubmit("password", e)} className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold py-6">Change password: </h1>
        <div className="flex gap-4 items-center">
          <label className="w-52" htmlFor="old">Old password: </label>
          <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="outline-none focus:border-color5 border-2 rounded-md p-2 w-60 h-11" type="password" name="old" id="old" />
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-52" htmlFor="new">New password: </label>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="outline-none focus:border-color5 border-2 rounded-md p-2 w-60 h-11" type="password" name="new" id="new" />
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-52" htmlFor="confirm">Confirm new password: </label>
          <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="outline-none focus:border-color5 border-2 rounded-md p-2 w-60 h-11" type="password" name="confirm" id="confirm" />
        </div>
        {passwordError ? <p className="text-red-600">{passwordError}</p> : <></>}
        <button className="ml-56 mt-4 w-60 h-11 flex justify-center items-center rounded-md text-xl duration-200 text-white bg-color5 hover:bg-color6" type="submit">Confirm</button>
      </form>
    </div>
  )
}

export default ProfileSettings