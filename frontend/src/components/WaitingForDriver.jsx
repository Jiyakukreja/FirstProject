import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapImg from "../images/map.png";

const WaitingForDriver = ({ pickup, destination, fare, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // Driver data
  const drivers = [
    {
      name: "Ravi Kumar",
      img: "https://randomuser.me/api/portraits/men/75.jpg",
      car: { model: "Maruti Swift", color: "Red" },
      plate: "CH01AB1234",
    },
    {
      name: "Amit Sharma",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      car: { model: "Hyundai i20", color: "White" },
      plate: "DL09CN8765",
    },
    {
      name: "Rajesh Gupta",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
      car: { model: "Tata Nexon", color: "Blue" },
      plate: "PB10DE4590",
    },
    {
      name: "Sandeep Yadav",
      img: "https://randomuser.me/api/portraits/men/60.jpg",
      car: { model: "Honda Amaze", color: "Black" },
      plate: "HR26BR7812",
    },
    {
      name: "Manoj Verma",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      car: { model: "Toyota Innova", color: "Silver" },
      plate: "MH12XY3456",
    },
  ];

  // Pick random driver
  const driver = drivers[Math.floor(Math.random() * drivers.length)];

  // OTP
  const otp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));

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
          <div className="bg-[#280A3E] pt-5 px-6 pb-3 text-center rounded-t-2xl">
            <h2 className="text-2xl font-serif font-bold text-[#F2EDD1] flex items-center justify-center gap-2">
              <i className="ri-steering-2-fill text-[#F2EDD1]"></i>
              Driver is on the way
            </h2>
            <div className="bg-[#601895] h-1 rounded-full mt-2"></div>

            {/* PIN */}
            <div className="bg-white mt-6 mb-3 rounded-sm h-16 flex items-center justify-between px-6 shadow">
              <p className="text-sm font-serif font-semibold text-gray-700 flex items-center gap-2">
                <i className="ri-key-2-fill text-[#601895]"></i>
                Share PIN with Driver
              </p>
              <div className="flex gap-2">
                {otp.map((num, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 flex items-center justify-center bg-[#689b8a] text-white font-bold rounded-md shadow"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Driver Card */}
          <div className="flex items-center gap-4 p-4 border-b">
            <div className="flex flex-col items-center">
              <img
                src={driver.img}
                alt="Driver"
                className="w-16 h-16 rounded-full border"
              />
              <p className="text-sm font-serif font-bold text-gray-800 mt-2 flex items-center gap-1">
                <i className="ri-user-3-fill text-[#280A3E]"></i> {driver.name}
              </p>
            </div>

            <div className="flex-1 text-right">
              <p className="text-base text-xl font-bold text-gray-800">
                {driver.plate}
              </p>
              <p className="text-lg font-serif text-gray-500 flex items-center justify-end gap-1">
                <i className="ri-car-fill text-[#601895]"></i> {driver.car.color}{" "}
                {driver.car.model}
              </p>
              <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                <i className="ri-star-fill text-yellow-500"></i>{" "}
                {(4 + Math.random()).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Message + Call */}
          <div className="flex gap-3 px-4 py-3 border-b">
            <div className="flex-1 flex items-center bg-[#F2EDD1] rounded-lg px-3">
              <input
                type="text"
                placeholder="Send a message"
                className="flex-1 bg-transparent outline-none py-2 font-serif text-md"
              />
              <button className="text-[#280A3E] hover:text-[#601895]">
                <i className="ri-send-plane-fill text-lg"></i>
              </button>
            </div>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#689b8a] text-white font-serif font-semibold rounded-lg hover:bg-[#578674]">
              <i className="ri-phone-fill"></i> Call
            </button>
          </div>

          {/* Pickup & Destination */}
          <div className="p-6 border-b">
            <div className="ml-2 border-l-2 border-gray-900 pl-4">
              <p className="text-md font-bold font-serif text-gray-700 flex items-center gap-4 pt-2">
                <i className="ri-map-pin-2-fill text-green-800"></i> {pickup}
              </p>
              <p className="text-md font-bold font-serif text-gray-700 mt-2 flex items-center gap-4 pt-4">
                <i className="ri-map-pin-line text-green-600"></i> {destination}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="p-4 border-b flex items-center gap-2 text-xl font-bold text-gray-800 px-5">
            <i className="ri-money-rupee-circle-fill text-[#601895] p-2"></i> ₹
            {Number(fare || 0).toFixed(2)}
          </div>

          {/* Cancel */}
          <div className="p-4 mt-auto">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-2 bg-red-100 text-red-600 font-serif font-semibold rounded-lg hover:bg-red-200 flex items-center justify-center gap-2"
            >
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
