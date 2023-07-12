import React, { useState, useEffect } from 'react';
import { bg4, bg5, bg6 } from '../../Images';
import './Home.css';

const Home = () => {
  const bgImages = [bg4, bg5, bg6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % bgImages.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className=' h-screen '>
        <div className="slider h-screen absolute top-0">
            {bgImages.map((image, index) => (
                <div
                key={index}
                className={`background h-screen ${currentImageIndex === index ? 'active' : ''}`}
                style={{
                    backgroundImage: `url(${image})`,
                    transform: `translateX(${(index - currentImageIndex) * 100}%)`,
                }}
                ></div>
            ))}
        </div>
        
    </div>
    
  );
};

export default Home;
