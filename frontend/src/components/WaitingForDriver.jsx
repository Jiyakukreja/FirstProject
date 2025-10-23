import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapImg from "../images/map.png";

const WaitingForDriver = ({ pickup, destination, fare, onCancel, rideData }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // Get captain data from rideData or use dummy data
  const captain = rideData?.ride?.captain || rideData?.captain;
  
  const driver = captain ? {
    name: `${captain.fullname?.firstname || ''} ${captain.fullname?.lastname || ''}`.trim() || "Driver",
    img: "https://randomuser.me/api/portraits/men/75.jpg", // Default image
    car: {
      model: `${captain.vehicle?.vehicleType || 'Car'}`,
      color: captain.vehicle?.color || "Unknown"
    },
    plate: captain.vehicle?.plate || "N/A",
  } : {
    name: "Driver",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    car: { model: "Car", color: "Unknown" },
    plate: "N/A",
  };

  // OTP from ride or generate random
  const otpString = rideData?.ride?.otp || rideData?.otp || "1234";
  const otp = otpString.split('').slice(0, 4);

  return (
    <div className="relative w-full h-screen">
      {/* Background Map */}
      <div
        className="h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${mapImg})` }}
      ></div>

      {/* Left Overlay */}
      <div className="absolute top-0 left-0 h-full w-[40%] bg-[#F2EDD1] border-r-2 border-black flex items-center justify-center px-6 py-10">
        {/* Card */}
        <div className="w-[90%] h-full bg-white rounded-2xl shadow-2xl border-2 border-gray-700 flex flex-col overflow-hidden relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#280A3E] to-[#601895] pt-5 px-6 pb-3 text-center rounded-t-2xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-[#F2EDD1] flex items-center justify-center gap-2">
              <i className="ri-steering-2-fill text-[#F9CB99] text-3xl animate-pulse"></i>
              Driver is on the way
            </h2>
            <div className="bg-[#F9CB99] h-1 rounded-full mt-2"></div>
            <p className="text-[#F2EDD1] text-sm mt-2 opacity-90">Your captain will arrive shortly at the pickup location</p>

            {/* PIN */}
            <div className="bg-gradient-to-r from-[#689b8a] to-[#4a7a6a] mt-6 mb-3 rounded-xl h-auto py-4 px-6 shadow-lg">
              <p className="text-sm font-serif font-semibold text-white flex items-center gap-2 mb-3">
                <i className="ri-key-2-fill text-[#F9CB99] text-xl"></i>
                Share this PIN with your Captain
              </p>
              <div className="flex gap-2 justify-center">
                {otp.map((num, i) => (
                  <span
                    key={i}
                    className="w-12 h-12 flex items-center justify-center bg-white text-[#280A3E] font-bold text-xl rounded-lg shadow-md border-2 border-[#F9CB99]"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="flex items-center gap-6 p-5 border-b bg-gradient-to-r from-white to-[#f9f9f9]">
            <div className="flex flex-col items-center">
              <img
                src={driver.img}
                alt="Driver"
                className="w-20 h-20 rounded-full border-4 border-[#601895] shadow-lg"
              />
              <p className="text-sm font-serif font-bold text-gray-800 mt-2 flex items-center gap-1">
                <i className="ri-user-3-fill text-[#280A3E]"></i> {driver.name}
              </p>
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">VEHICLE NUMBER</span>
                  <p className="text-lg font-bold text-gray-800">{driver.plate}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">VEHICLE</span>
                  <p className="text-base font-serif text-gray-700 flex items-center gap-1">
                    <i className="ri-car-fill text-[#601895]"></i> {driver.car.color} {driver.car.model}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">RATING</span>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <i className="ri-star-fill text-yellow-500"></i>
                    {(4 + Math.random()).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message + Call */}
          <div className="flex gap-3 px-5 py-4 border-b bg-white">
            <div className="flex-1 flex items-center bg-[#F2EDD1] rounded-xl px-4 border-2 border-gray-200 shadow-sm">
              <input
                type="text"
                placeholder="Send a message to driver..."
                className="flex-1 bg-transparent outline-none py-2.5 font-serif text-sm"
              />
              <button className="text-[#280A3E] hover:text-[#601895] transition">
                <i className="ri-send-plane-fill text-xl"></i>
              </button>
            </div>

            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#689b8a] to-[#4a7a6a] text-white font-serif font-semibold rounded-xl hover:scale-105 transition shadow-md">
              <i className="ri-phone-fill text-lg"></i> Call
            </button>
          </div>

          {/* Pickup & Destination */}
          <div className="p-5 border-b bg-white">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2 mt-1">
                  <span className="w-4 h-4 bg-green-600 rounded-full shadow-md"></span>
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                  <span className="w-4 h-4 bg-purple-800 rounded-sm shadow-md"></span>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">PICKUP</p>
                    <p className="text-base font-bold text-gray-800">{pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">DESTINATION</p>
                    <p className="text-base font-bold text-gray-800">{destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fare */}
          <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-white to-[#f9f9f9]">
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">FARE AMOUNT</p>
              <p className="text-2xl font-bold text-[#601895] flex items-center gap-2">
                <i className="ri-money-rupee-circle-fill"></i>
                ₹{Number(fare || 0).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <i className="ri-wallet-3-line"></i>
              Cash Payment
            </p>
          </div>

          {/* Cancel */}
          <div className="p-5 mt-auto">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-3 bg-red-100 text-red-600 font-serif font-bold rounded-xl hover:bg-red-200 flex items-center justify-center gap-2 border-2 border-red-300 shadow-sm transition"
            >
              <i className="ri-close-circle-line text-xl"></i>
              Cancel Ride
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[320px] text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Are you sure you want to cancel this ride?
            </h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (onCancel) onCancel();
                  navigate("/home");
                  window.location.replace("/home");
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingForDriver;
