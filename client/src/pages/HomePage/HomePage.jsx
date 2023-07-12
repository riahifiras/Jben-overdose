import React from 'react'
import Header from '../../containers/Header/Header'
import Home from '../../containers/Home/Home'
import About from '../../containers/About/About'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className=' bg-color1'>
        <Header/>
        <Home />
        <About/>
    </div>
  )
}

export default HomePage