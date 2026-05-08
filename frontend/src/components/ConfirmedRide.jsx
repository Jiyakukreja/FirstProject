import React, { useEffect, useState } from "react";
import mapImg from "../images/map.png";

const ConfirmedRide = ({
  pickup = "Default Pickup Location",
  destination = "Default Destination",
  fare = "₹0",
  vehicleType = "Car", // 👈 selected cab type
  otp = null,
  onCancel,
  onChangeDestination,
}) => {
  const texts = [
    "Finding you a driver...",
    "Confirming your ride...",
    "Almost there...",
    "Hang tight, a cab is on the way!",
    "Just a moment, securing your ride...",
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle fare display: show only selected vehicle
  let displayFare;
  if (typeof fare === "object") {
    displayFare = `₹${fare[vehicleType.toLowerCase()]}`;
  } else {
    displayFare = fare;
  }

  return (
    <div className="flex w-full h-screen font-serif bg-[#F2EDD1]">
      {/* Left Panel */}
      <div className="w-[40%] bg-[#F2EDD1] flex flex-col shadow-lg border-r border-gray-300">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#3B1656] to-[#280A3E] p-8 shadow-md flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <i className="ri-taxi-line text-3xl text-[#F9CB99] animate-bounce"></i>
            <h2 className="text-2xl md:text-3xl font-bold text-[#F2EDD1] text-center">
              {texts[currentText]}
            </h2>
          </div>
          <div className="mt-3 h-2 w-full bg-[#4a275c] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#F9CB99] animate-[loading_1.5s_linear_infinite] rounded-full"></div>
          </div>
          <p className="text-[#F2EDD1] text-sm mt-3 opacity-80">We're connecting you with the best available driver...</p>
        </div>

        {/* Ride Info */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full">
            {/* Pickup & Destination */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full shadow-md"></span>
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <span className="w-4 h-4 bg-purple-800 rounded-sm shadow-md"></span>
                </div>
                <div className="flex-1 space-y-6">
                  {/* Pickup */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">PICKUP LOCATION</p>
                      <p className="text-base text-gray-800 font-medium">{pickup}</p>
                    </div>
                  </div>
                  
                  {/* Destination */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">DROP LOCATION</p>
                      <p className="text-base text-gray-800 font-medium">{destination}</p>
                    </div>
                    <button
                      onClick={onChangeDestination}
                      className="ml-4 px-4 py-1.5 text-xs bg-[#280A3E] text-white rounded-full hover:bg-[#3B1656] transition shadow-sm"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* OTP Display - User shares this with captain */}
            {otp && (
              <div className="bg-gradient-to-r from-[#689B8A] to-[#4a7a6a] rounded-xl p-5 my-4 shadow-md">
                <div className="text-center mb-3">
                  <p className="text-sm text-white font-bold flex items-center justify-center gap-2">
                    <i className="ri-key-2-fill text-lg"></i>
                    YOUR RIDE OTP
                  </p>
                  <p className="text-xs text-white/80 mt-1">Share this with your Captain</p>
                </div>
                <div className="flex gap-3 justify-center">
                  {otp.toString().split('').map((digit, index) => (
                    <span
                      key={index}
                      className="w-14 h-14 flex items-center justify-center bg-white text-[#280A3E] font-bold text-2xl rounded-lg shadow-lg border-2 border-[#F9CB99]"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Vehicle + Fare */}
            <div className="border-t-2 border-gray-200 pt-4 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">SELECTED VEHICLE</p>
                  <p className="text-xl font-bold text-[#280A3E]">{vehicleType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-semibold mb-1">FARE</p>
                  <p className="text-2xl font-bold text-[#601895]">{displayFare}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <i className="ri-wallet-3-line text-[#601895]"></i>
                Payment: Cash
              </p>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="mt-4 w-full py-3 text-lg border-2 border-red-400 text-red-600 bg-white rounded-xl shadow-md hover:bg-red-50 transition font-semibold flex items-center justify-center gap-2"
          >
            <i className="ri-close-circle-line text-xl"></i>
            Cancel Ride
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 relative">
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${mapImg})` }}
        ></div>
      </div>

      {/* Loading animation */}
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
