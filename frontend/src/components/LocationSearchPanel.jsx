import React, { useState } from 'react';

const LocationSearchPanel = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Random Punjab/Chandigarh locations
  const locations = [
    "Sector 17, Chandigarh",
    "Elante Mall, Chandigarh",
    "Sector 22, Chandigarh",
    "PGI, Chandigarh",
    "Mohali Bus Stand, Punjab",
    "Sukhna Lake, Chandigarh"
  ];

  return (
    <div className='p-4 bg-[#c3d7d0] rounded-xl'>
      {locations.map((loc, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flex items-center border-2 border-r-4 rounded-xl justify-start font-serif px-5 py-2 mb-4 bg-white cursor-pointer transform transition-all duration-300
            ${activeIndex === index ? 'border-black -translate-y-2 shadow-lg' : 'border-gray-200 translate-y-0'}
          `}
        >
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full p-0 mr-2'>
            <i className="ri-map-pin-fill text-xl"></i>
          </h2>
          <h4 className='py-2 px-4 text-lg'>{loc}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
