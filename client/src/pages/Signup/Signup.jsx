import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Signup.css';

const Signup = () => {
  const [info, setInfo] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    Cpassword: '',
  });

  const [check, setCheck] = useState({
    agree: false,
    notify: false,
  });

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    setPasswordError(false);
    setEmailError(false);
    setConfirmPasswordError(false);
  };

  const toggle = (e) => {
    const { name, checked } = e.target;
    setCheck((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    if (info.password.length < 8) {
      setPasswordError('Password should be at least 8 characters long.');
      isValid = false;
    } else if (!/\d/.test(info.password)) {
      setPasswordError('Password should contain at least one number.');
      isValid = false;
    } else if (!/[a-zA-Z]/.test(info.password)) {
      setPasswordError('Password should contain at least one letter.');
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (info.email.trim() === '' || !/\S+@\S+\.\S+/.test(info.email)) {
      setEmailError(true);
      isValid = false;
    }

    if (info.password !== info.Cpassword) {
      setConfirmPasswordError(true);
      isValid = false;
    }

    if (!check.agree) {
      setAgreeError('Please agree to the Terms and Conditions.');
      isValid = false;
    } else {
      setAgreeError(false);
    }

    return isValid;
  };

  const post = async () => {
    try {
      const hashedPassword = await bcrypt.hash(info.password, 10);
      await axios.post('http://localhost:3000/signup', {
        fullName: info.fullname,
        username: info.username,
        email: info.email,
        password: hashedPassword,
      });
      console.log('Signup successful!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setInfo({
      fullname: '',
      username: '',
      email: '',
      password: '',
      Cpassword: '',
    });

    setCheck({
      agree: false,
      notify: false,
    });

    post();
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start text-lg gap-4 p-10 rounded-md border-2">
        <h1 className="text-4xl font-semibold text-color5 mx-auto">Sign up</h1>
        <div className="flex flex-col">
          <label htmlFor="fullname">Full name</label>
          <input type="text" name="fullname" onChange={handleChange} value={info.fullname} className="h-11 w-96 border-2 rounded-md p-2 outline-none focus:border-color5" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} value={info.username} className="h-11 w-96 border-2 rounded-md p-2 outline-none focus:border-color5" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} value={info.email} className={`h-11 w-96 border-2 rounded-md p-2 outline-none ${emailError ? 'border-red-500' : 'focus:border-color5'}`} />
          {emailError && <p className="text-red-500">Please enter a valid email address.</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={info.password}
            className={`h-11 w-96 border-2 rounded-md p-2 outline-none ${passwordError ? 'border-red-500' : 'focus:border-color5'}`}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Cpassword">Confirm password</label>
          <input
            type="password"
            name="Cpassword"
            onChange={handleChange}
            value={info.Cpassword}
            className={`h-11 w-96 border-2 rounded-md p-2 outline-none ${confirmPasswordError ? 'border-red-500' : 'focus:border-color5'}`}
          />
          {confirmPasswordError && <p className="text-red-500">Passwords do not match.</p>}
        </div>
        <div className="flex flex-col">
          <div className='flex gap-2 '>
            <input type='checkbox' name='agree' onChange={toggle} checked={check.agree} />
            <label htmlFor='agree'>I agree to the <span className='cursor-pointer hover:underline'>Terms and Conditions</span></label>
          </div>
          {agreeError && <p className='text-red-500'>{agreeError}</p>}
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="notify" onChange={toggle} checked={check.notify} />
          <label htmlFor="notify">Send me promotional emails/notifications</label>
        </div>
        <button type="submit" className="flex justify-center items-center text-white bg-color5 hover:bg-color6 w-96 h-11 rounded-md cursor-pointer">
          Sign up
        </button>
        <span>Already have an account? <Link to="/login" className='hover:underline'>Log in</Link></span>
      </form>
    </div>
  );
};

export default Signup;
