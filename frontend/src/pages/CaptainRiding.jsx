import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import mapImg from "../images/map.png"; // apna map image lagao
import "remixicon/fonts/remixicon.css";
import { SocketContext } from "../context/SocketContext";

const CaptainRiding = () => {
  const [showFinish, setShowFinish] = useState(false);
  const [distance, setDistance] = useState("4 kms away");
  const navigate = useNavigate();
  const { currentRide, rideStatus, updateRideStatus, socket } = useContext(SocketContext);

  // If no current ride, redirect back to captain home
  useEffect(() => {
    if (!currentRide) {
      console.warn("No current ride data, redirecting to captain home");
      navigate("/captain-home");
    }
  }, [currentRide, navigate]);

  // Default ride data if currentRide is not available (fallback)
  const ride = currentRide || {
    user: { fullname: { firstname: "Unknown", lastname: "User" }},
    pickup: "Unknown Location",
    destination: "Unknown Destination", 
    fare: 0,
    distance: "0 KM",
    payment: "Cash"
  };

  const passenger = ride.user?.fullname 
    ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}`
    : "Unknown User";

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center font-serif"
      style={{ backgroundImage: `url(${mapImg})` }}
    >
      {/* Top Status Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 
        bg-gradient-to-r from-green-500 to-green-600 
        px-8 py-3 rounded-full shadow-2xl z-20 flex items-center gap-3">
        <i className="ri-map-pin-line text-white text-2xl animate-pulse"></i>
        <span className="text-white font-bold text-lg">Ride In Progress</span>
      </div>

      {/* Bottom Ride Info Bar */}
      <div
        className="absolute bottom-0 left-0 h-32 w-full 
        bg-gradient-to-r from-white via-[#f9f9f9] to-white 
        backdrop-blur-md shadow-2xl 
        border-t-4 border-[#601895]
        rounded-t-3xl px-8 flex justify-between items-center"
      >
        {/* Location + Distance */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <i className="ri-map-pin-2-fill text-[#601895] text-2xl"></i>
            <p className="text-gray-900 font-bold text-xl tracking-wide">
              {distance}
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-1 ml-9 font-semibold">to destination</p>
        </div>

        {/* Complete Ride Button */}
        <button
          onClick={() => setShowFinish(true)}
          className="px-8 py-4 bg-gradient-to-r from-[#601895] to-[#280A3E] 
          text-white rounded-2xl font-bold text-lg shadow-2xl 
          hover:scale-105 transition-all duration-300 flex items-center gap-2
          border-2 border-white"
        >
          <i className="ri-flag-fill text-xl"></i>
          Complete Ride
        </button>
      </div>

      {/* Slide-up Finish Ride Panel */}
      <AnimatePresence>
        {showFinish && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-[75%] bg-white 
            p-4 rounded-t-3xl shadow-2xl z-30 flex flex-col justify-between"
          >
            <div>
              {/* Close Arrow */}
              <div className="flex justify-center mb-2">
                <i
                  onClick={() => setShowFinish(false)}
                  className="ri-arrow-down-s-line text-3xl cursor-pointer text-gray-600 hover:text-black transition"
                ></i>
              </div>

             {/* Stylish Heading */}
<h2
  className="text-3xl font-extrabold text-center 
  bg-gradient-to-r from-[#601895] to-[#280A3E] 
  text-transparent bg-clip-text tracking-wider 
  flex items-center justify-center gap-2 drop-shadow-lg"
>
  <i className="ri-flag-checkered-fill text-[#601895] text-3xl"></i>
  Finish this Ride
</h2>
<div className="w-14 h-1 bg-[#601895] rounded-full mx-auto mt-1 mb-5"></div>

              {/* Passenger Info Card */}
              <div className="bg-gradient-to-r from-[#F2EDD1] to-[#e8dfc9] p-5 rounded-xl shadow-lg mb-6 border-2 border-[#601895]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={ride.user?.profileImage || "https://randomuser.me/api/portraits/women/45.jpg"}
                      alt={passenger}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">PASSENGER</p>
                      <p className="font-bold text-xl text-[#280A3E]">{passenger}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-semibold mb-1">DISTANCE</p>
                    <p className="font-bold text-lg text-[#601895]">{ride.distance || "Calculating..."}</p>
                  </div>
                </div>
              </div>

              {/* Ride Details */}
              <div className="space-y-4 text-gray-800">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-map-pin-2-fill text-green-600 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-1">PICKUP LOCATION</p>
                      <p className="text-base font-semibold">{ride.pickup}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="ri-map-pin-user-fill text-purple-600 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-1">DROP LOCATION</p>
                      <p className="text-base font-semibold">{ride.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#601895] to-[#280A3E] p-4 rounded-xl shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <i className="ri-wallet-3-fill text-[#601895] text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white/80 mb-1">FARE AMOUNT</p>
                      <p className="text-xl font-bold text-white">
                        ₹{ride.fare} <span className="text-sm font-normal">• {ride.payment || "Cash"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Finish Button */}
            <button
              onClick={() => {
                console.log("🏁 Completing ride:", currentRide?._id);
                // Emit completeRide to backend
                socket.emit('completeRide', {
                  rideId: currentRide?._id
                });
                
                // Navigate back to captain home
                setTimeout(() => {
                  navigate("/captain-home");
                }, 500);
              }}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-800 
              text-white rounded-xl font-bold text-lg shadow-lg 
              hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              <i className="ri-checkbox-circle-fill text-2xl"></i>
              Complete Ride & Return Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaptainRiding;
