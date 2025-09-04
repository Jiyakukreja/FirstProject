import React, { useEffect, useState } from "react";
import mapImg from "../images/map.png"; // Right side map background

const ConfirmedRide = ({ 
  pickup = "Default Pickup Location", 
  destination = "Default Destination", 
  fare = "₹0", 
  onCancel,
  onChangeDestination  // 👈 naya prop
}) => {

  const texts = [
    "Finding you a driver!",
    "Confirming your ride!",
    "Almost there!",
    "Hang tight, a cab is on the way!",
    "Just a moment, securing your ride!"
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000); // change text every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full h-screen">
      {/* Left Side Panel */}
      <div className="w-[40%] bg-[#F2EDD1] flex flex-col shadow-lg">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#280A3E] to-[#3B1656] p-8 shadow-md flex flex-col items-center">
          <h2 className="text-3xl font-serif font-bold text-[#F2EDD1] text-center mb-4 mt-2">
            {texts[currentText]}
          </h2>

          {/* Loading Bar */}
          <div className="mt-3 h-2 w-full bg-[#3B1656] rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-[#F9CB99] animate-[loading_1.5s_linear_infinite] rounded-full"></div>
          </div>
        </div>

        {/* Ride Details Card */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div className="bg-white border-2 border-gray-600 h-70 border-[#F9CB99] rounded-2xl shadow-lg p-9">
            <div className="mb-4">
              {/* Pickup */}
              <div className="flex items-center gap-6  mb-3">
                <span className="w-4 h-4 bg-[#689B8A] rounded-full"></span>
                <p className="text-lg font-serif text-gray-700">
                  <span className="font-semibold p-6">Meet at MHC Market</span> {pickup}
                </p>
              </div>
              {/* Destination + Change Button */}
              <div className="flex items-center gap-6 mt-6 mb-6">
                <span className="w-4 h-4 bg-[#280A3E] rounded-sm"></span>
                <p className="text-lg font-serif text-gray-700 flex-1 flex justify-between items-center">
                  <span>
                    <span className="font-semibold p-6">Nexus Elante Mall</span> {destination}
                  </span>
                  {/* 👇 Change Button */}
                  <button
                    onClick={onChangeDestination}
                    className="ml-4 px-3 py-1 text-sm bg-[#280A3E] text-white rounded-full hover:bg-[#3B1656] transition"
                  >
                    Change
                  </button>
                </p>
              </div>
            </div>

            {/* Fare with wallet icon */}
            <div className="flex flex-col items-start mt-6">
              <div className="flex items-center gap-7">
                <i className="ri-wallet-3-line text-2xl text-[#280A3E]"></i>
                <span className="text-xl p-2 font-bold text-[#280A3E]">
                  {fare}
                </span>
              </div>
              <span className="text-base px-5 font-normal text-gray-600 ml-11">
                Cash
              </span>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="mt-6 w-full py-3 text-lg border-4 border-red-400 text-red-600 bg-white rounded-xl shadow-sm hover:bg-red-50 transition font-serif"
          >
            Cancel Ride
          </button>
        </div>
      </div>

      {/* Right Side Map */}
<div className="flex-1 relative border border-gray-800 rounded-md">
  <div
    className="h-full bg-cover bg-center"
    style={{ backgroundImage: `url(${mapImg})` }}
  ></div>


        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#F2EDD1] shadow-2xl border-t border-gray-700 border-[#F9CB99] py-4 rounded-t-xl">
          <div className="flex justify-around px-4 gap-6">
            {/* Card 1 */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center gap-6 hover:scale-[1.02] transition cursor-pointer">
              <i className="ri-car-line text-2xl text-[#280A3E]"></i>
              <div>
                <p className="text-sm font-semibold text-gray-800">Request more rides</p>
                <p className="text-xs text-gray-500">For yourself or guests</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center gap-6 hover:scale-[1.02] transition cursor-pointer">
              <i className="ri-exchange-line text-2xl text-[#280A3E]"></i>
              <div>
                <p className="text-sm font-semibold text-gray-800">Send and receive</p>
                <p className="text-xs text-gray-500">One or multiple items</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-4 flex items-center gap-6 hover:scale-[1.02] transition cursor-pointer">
              <i className="ri-calendar-line text-2xl text-[#280A3E]"></i>
              <div>
                <p className="text-sm font-semibold text-gray-800">Reserve a ride</p>
                <p className="text-xs text-gray-500">Up to 90 days ahead</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Animation Keyframes */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
          .animate-[loading_1.5s_linear_infinite] {
            animation: loading 1.5s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmedRide;
