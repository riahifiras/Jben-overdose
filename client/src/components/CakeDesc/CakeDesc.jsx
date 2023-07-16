import React, { useState, useEffect } from 'react'
import {cheese} from '../../Images'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CakeDesc = () => {

    const { pathname } = useLocation();
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/getcakes/${id}`);
            setData(res.data.cake);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(true);
        }
        
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    if(isLoading){
        return <p className="text-6xl text-center mt-8 font-bold">Loading...</p>;
    }
    else{
        return (
            <div className='mt-8 border-2 mx-auto w-8/12 px-20 py-6'>
                <section className='flex flex-row justify-center gap-20'>
                <img src={data.picture} alt="cheeseCake" className='h-96 aspect-square object-cover'/>
                <div className='flex flex-col text-left items-start gap-5 mt-12'>
                    <h1 className='text-4xl font-bold'>{data.title}</h1>
                    <p className='text-lg'>{data.description}</p>
                    <p>stars here</p>
                    <p className='text-xl font-semibold'>${data.price}</p>
                    <button className='flex justify-center items-center w-32  h-10 bg-color5 hover:bg-color6 duration-150 text-white px-6'>Add to cart</button>
                </div>
                </section>
            </div>
        )
    }
}

export default CakeDesc