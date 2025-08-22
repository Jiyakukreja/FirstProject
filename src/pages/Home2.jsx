import React from 'react';
import { Link } from 'react-router-dom';   // 🔹 Link import
import img1 from '../images/image1.png';
import img2 from '../images/image2.png';
import img3 from '../images/image3.png';
import img4 from '../images/image4.png';

const Home2 = () => {
  return (
    <div className="py-16 px-8" style={{ backgroundColor: "#F2EDD1" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Images */}
        <div className="grid grid-cols-2 gap-6">
          {[img1, img2, img3, img4].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`img${index + 1}`}
              className="
                rounded-2xl 
                shadow-xl 
                border-4 
                border-[#E3A66B] 
                w-full 
                h-56 
                object-cover 
                transition-transform 
                duration-500 
                hover:scale-105 
                hover:shadow-[#E3A66B]/50
              "
            />
          ))}
        </div>

        {/* Right Side: Content */}
        <div className="font-serif">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#280A3E]">Faster Rides, </span>
            <span className="text-[#E3A66B]">Smarter</span>{' '}
            <span className="text-[#280A3E]">Prices.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover amazing destinations, hidden gems, and breathtaking
            experiences around the world with Raahi.
          </p>

          {/* 🔹 Button with Link */}
          <Link to="/login">
            <button className="
              font-mg 
              bg-[#689B8A] 
              text-white 
              px-8 
              py-3 
              rounded-xl 
              shadow-lg 
              hover:bg-[#527d6f] 
              hover:shadow-[#689B8A]/50 
              transition 
              duration-300 
              font-semibold
            ">
              Book a Ride
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home2;
