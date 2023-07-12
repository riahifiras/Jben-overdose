import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Bar from '../../components/Bar/Bar'
import { Logo } from "../../Images"
import './Header.css'

const Header = () => {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
    console.log(path)
  }, [])

  return (
    <div className="w-full border-b-2 bg-white sticky z-20 top-0 left-0 right-0">
      <div className='flex flex-row justify-between items-center w-8/12 h-20 mx-auto'>
        <img src={Logo} alt="" className='h-20'/>
        { path === '/' ? <Navbar/> : <Bar/>}
      </div>
    </div>
  )
}

export default Header