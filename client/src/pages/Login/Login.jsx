import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import bcrypt from 'bcryptjs'
import './Login.css'

const Login = () => {

  const [data, setData] = useState([]);

  const [info, setInfo] = useState({
    identifier: "",
    password: "",
  })

  const [remember, setRemember] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo((prevInfo) => ({
      ...prevInfo, [name]: value
    }));
  }

  const get = async () => {
    try {
      const hashedPassword = await bcrypt.hash(info.password, 10);
      const result = await axios.get('http://localhost:3000/login/');
      const users = result.data.Users;
  
      for (const user of users) {
        const isEmailMatch = user.email === info.identifier;
        const isUsernameMatch = user.username === info.identifier;
  
        if (isEmailMatch || isUsernameMatch) {
          const isPasswordMatch = await bcrypt.compare(info.password, user.password);
  
          if (isPasswordMatch) {
            // Account found
            console.log('Matching user:', user);
            return;
          } else {
            // Incorrect password
            console.log('Incorrect password');
            return;
          }
        }
      }
  
      // Account not found
      console.log('Account not found');
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!info.identifier || !info.password) {
      console.log('Please enter both identifier and password.');
      return;
    }
  
    setInfo({
      ...info,
      identifier: info.identifier.trim(), // Trim whitespace from the identifier
    });
  
    setRemember(false);
  
    get();
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start text-lg gap-4 p-10 rounded-md border-2'>
        <h1 className='text-4xl font-semibold text-color5 mx-auto'>Log in</h1>     
        <div className='flex flex-col'><label htmlFor="identifier">Username or email</label>
        <input type="text" name="identifier" onChange={handleChange} value={info.identifier} className='h-11 w-96 border-2 rounded-md p-2 outline-none focus:border-color5 ' /></div>
        <div className='flex flex-col'><label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={info.password} className='h-11 w-96 border-2 rounded-md p-2 outline-none focus:border-color5 ' /></div>
        <div className='flex gap-2 '>
          <input type="checkbox" name="notify" onChange={() => setRemember(!remember)} checked={remember} />
          <label htmlFor="notify">Send me promotional emails/notifications</label>
        </div>
        <button type="submit" className='flex justify-center items-center text-white bg-color5 hover:bg-color6 w-96 h-11 rounded-md cursor-pointer'>Log in</button>
        <span>Don't have an account? <Link to="/signup" className='hover:underline'>Sign up</Link></span>
      </form>
    </div>
  )
}

export default Login