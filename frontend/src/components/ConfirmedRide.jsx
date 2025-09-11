import React, { useEffect, useState } from "react";
import mapImg from "../images/map.png";

const ConfirmedRide = ({
  pickup = "Default Pickup Location",
  destination = "Default Destination",
  fare = "₹0",
  vehicleType = "Car", // 👈 selected cab type
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2EDD1] text-center mb-4">
            {texts[currentText]}
          </h2>
          <div className="mt-3 h-2 w-full bg-[#4a275c] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#F9CB99] animate-[loading_1.5s_linear_infinite] rounded-full"></div>
          </div>
        </div>

        {/* Ride Info */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-8 h-[320px] flex flex-col justify-between">
            {/* Pickup */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <span className="w-3 h-3 bg-green-600 rounded-full mt-1"></span>
                <p className="text-lg text-gray-800">{pickup}</p>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-4 mb-6">
                <span className="w-3 h-3 bg-purple-800 rounded-sm mt-1"></span>
                <div className="flex-1 flex justify-between items-center">
                  <p className="text-lg text-gray-800">{destination}</p>
                  <button
                    onClick={onChangeDestination}
                    className="ml-4 px-3 py-1 text-sm bg-[#280A3E] text-white rounded-full hover:bg-[#3B1656] transition"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Vehicle + Fare (LEFT ALIGNED NOW) */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xl font-bold text-black">
                {vehicleType}: {displayFare}
              </p>
              <p className="text-md text-gray-700 mt-1">{vehicleType}</p>
              <p className="text-sm text-gray-500 mt-1">Payment: Cash</p>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="mt-6 w-full py-3 text-lg border-2 border-red-400 text-red-600 bg-white rounded-xl shadow-sm hover:bg-red-50 transition"
          >
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
