import React, { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import axios from "../../api/axios";

const ProfileHeader = ({ image, id, name }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 1 * 1024 * 1024) { // Check if file size is less than 1MB
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          // Send a PUT request to update profile picture
          updateProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Image size should be less than 1MB.');
      }
    }
  };

  const updateProfilePic = async (base64Image) => {
    try {
      const response = await axios.put(
        `setAccountInfo/${id}`,
        { profilePic: base64Image }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-row justify-around items-center p-10 border-b-2">
      <div className="relative w-80 h-80 rounded-full">
        <img
          className="w-80 h-80 object-cover rounded-full shadow-md"
          src={selectedImage || image}
          alt="profile pic"
        />
        <input
          type="file"
          id="profile-pic-input"
          name="profile-pic"
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="profile-pic-input"
          className="flex justify-center items-center text-transparent text-xl gap-3 font-semibold w-80 h-80 object-cover rounded-full absolute inset-0 cursor-pointer hover:bg-black-50 hover:text-white"
        >
          <FaFileUpload />
          <span>Upload profile picture</span>
        </label>
      </div>

      <h1 className="text-6xl text-left w-3/5">{name}</h1>
    </div>
  );
};

export default ProfileHeader;
