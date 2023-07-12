import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import cakes from '../../assets/data'
import CakeCard from '../../components/CakeCard/CakeCard'
import { cheese } from '../../Images'
import Options from '../../components/Options/Options'
import CakeItem from '../../components/CakeItem/CakeItem';


const Menu = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") ? localStorage.getItem("mode"): "grid");

  localStorage.setItem("mode", mode);

  const { pathname } = useLocation();
  const substr = pathname.substring(pathname.lastIndexOf('/') + 1);

  const fetchData = async () => {
    try {
      let res = ""
      if(substr === "shop"){
        res = await axios.get("http://localhost:3000/getCakes");  
      }
      else{
        res = await axios.get(`http://localhost:3000/getCakesBySubstring/${substr}`);
      }
      setIsLoading(false);
      setData(res.data.Cakes);
    }
    catch (error) {
      setIsLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (isLoading) {
    return <p className="text-6xl text-center mt-8 font-bold">Loading...</p>;
  } else {
    if(mode === "grid"){
      return (
        <div className='mt-8 border-2 mx-auto w-8/12'>
          <Options mode={mode} setMode={setMode}/>
          <div className='grid grid-cols-4 gap-6 mx-2'>
            {data.map(({_id, title, price, picture}) => {
              return (
                <CakeCard key={_id} id={_id} title={title} picture={picture} price={price} />
              );
            })}
          </div>
        </div>
      );
    }
    else if(mode === "list"){
      return (
        <div className='mt-8 border-2 mx-auto w-8/12'>
          <Options mode={mode} setMode={setMode}/>
          <div className=''>
            {data.map(({_id, title, price, picture}) => {
              return (
                <CakeItem key={_id} id={_id} title={title} picture={picture} price={price} />
              );
            })}
          </div>
        </div>
      );
    }
  }
  
}

export default Menu