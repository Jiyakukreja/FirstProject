import React, { useState } from 'react';

const LocationSearchPanel = ({ setVehiclePanel }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const locations = [
    "Sector 17, Chandigarh",
    "Elante Mall, Chandigarh",
    "Sector 22, Chandigarh",
    "PGI, Chandigarh",
    "Mohali Bus Stand, Punjab",
    "Sukhna Lake, Chandigarh"
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div className="p-5 bg-gray-300 rounded-xl shadow-xl border border-gray-700">
      {locations.map((loc, index) => (
        <div
          onClick={() => { setVehiclePanel(true); handleClick(index); }}
          key={index}
          className={`flex items-center border-2 border-gray-700 rounded-xl justify-start font-serif px-5 py-3 mb-4 cursor-pointer transition-all duration-300
            ${
              activeIndex === index
                ? 'border-[#4B0082] bg-[#4B0082] text-white scale-105 shadow-lg'
                : 'border-gray-300 bg-[#F9FAFB] hover:border-[#4B0082] hover:shadow-md'
            }
          `}
        >
          {/* Icon */}
          <div className={`h-10 w-10 flex items-center justify-center rounded-full mr-3 transition
            ${activeIndex === index ? 'bg-white text-[#3BB273]' : 'bg-[#3BB273] text-white'}
          `}>
            <i className="ri-map-pin-fill text-lg"></i>
          </div>

          {/* Location Name */}
          <h4 className={`text-lg font-medium tracking-wide ${
            activeIndex === index ? 'text-white' : 'text-gray-800'
          }`}>
            {loc}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
