import React, { useEffect, useState } from 'react';
import logo from '../images/image.png';
import { Link } from 'react-router-dom';
import Home2 from './Home2';   
import Home3 from './Home3';
import Home4 from './Home4';  
import Home5 from './Home5';

const Home = () => {
  const [fadeOutSplash, setFadeOutSplash] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOutSplash(true), 3500);
    const hideTimer = setTimeout(() => setShowSplash(false), 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* Home Screen */}
      <div className="relative h-screen w-full overflow-hidden bg-[#F2EDD1]">
        <div
          className={`absolute inset-0 transition-opacity duration-1500 ${
            fadeOutSplash ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 1 }}
        >
          <div className="relative h-full w-full flex flex-col items-center justify-center">
            {/* Background image */}
            <div className="absolute inset-0 bg-contain bg-center bg-[url('https://images.pexels.com/photos/262100/pexels-photo-262100.jpeg')] z-0"></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#280A3E]/50 z-10"></div>

            {/* Main content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full">
              <img 
                className="w-84 h-72 mb-6 object-cover object-bottom rounded-xl shadow-lg" 
                src={logo} 
                alt="Logo" 
              />
              <div className="bg-[#A2C3AD] p-8 rounded-2xl shadow-md flex justify-center items-center flex-col max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4 font-serif tracking-wider">
                  Get started with Raahi
                </h2>
                <Link 
                  to='/login' 
                  className="bg-[#280A3E] text-white py-3 rounded-md font-mono w-full max-w-[300px] mx-auto"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Splash Screen */}
        {showSplash && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1500 ${
              fadeOutSplash ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ background: '#F2EDD1', zIndex: 2 }}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-96 h-auto animate-carMove"
            />
            <style>
              {`
                @keyframes carMove {
                  0% {
                    transform: translateX(100%) scale(1);
                    opacity: 1;
                  }
                  60% {
                    transform: translateX(-20%) scale(1.1);
                    opacity: 1;
                  }
                  100% {
                    transform: translateX(-100%) scale(1.1);
                    opacity: 0;
                  }
                }
                .animate-carMove {
                  animation: carMove 4s cubic-bezier(0.4,0,0.2,1) forwards;
                  position: relative;
                }
              `}
            </style>
          </div>
        )}
      </div>

      {/* 👇 Ye Home2 neeche attach ho jayega */}
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
    </>
  );
};

export default Home;
