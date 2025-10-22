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
  const { currentRide, rideStatus, updateRideStatus } = useContext(SocketContext);

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
      {/* Bottom Ride Info Bar */}
      <div
        className="absolute bottom-0 left-0 h-28 w-full 
        bg-gradient-to-r from-white/95 to-white/80 
        backdrop-blur-md shadow-xl 
        border-t border-gray-300 
        rounded-t-3xl px-6 flex justify-between items-center"
      >
        {/* Location + Distance */}
        <div className="flex flex-col pl-6">
          <div className="flex items-center gap-2 ">
            <i className="ri-map-pin-2-fill text-[#601895] text-xl"></i>
            <p className="text-gray-900 font-bold text-lg tracking-wide">
              {distance}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">Distance</p>
        </div>

        {/* Complete Ride Button */}
        <button
          onClick={() => setShowFinish(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#601895] to-[#280A3E] 
          text-white rounded-2xl font-semibold shadow-lg 
          hover:scale-105 transition-all duration-300"
        >
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
              <div
                className="flex justify-between items-center 
              bg-[#F2EDD1] p-4 rounded-xl shadow mb-6 border-2 border-gray-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={ride.user?.profileImage || "https://randomuser.me/api/portraits/women/45.jpg"}
                    alt={passenger}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <p className="font-bold text-xl">{passenger}</p>
                </div>
                <p className="font-bold text-gray-800">{ride.distance || "Calculating..."}</p>
              </div>

              {/* Ride Details */}
              <div className="space-y-5 text-gray-800 text-lg px-2 tracking-wide">
                <div className="flex items-start gap-6 px-2">
                  <i className="ri-map-pin-2-fill text-[#601895] text-xl"></i>
                  <div>
                    <p className="font-bold">Pickup</p>
                    <p>{ride.pickup}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 px-2">
                  <i className="ri-map-pin-user-fill text-[#601895] text-xl"></i>
                  <div>
                    <p className="font-bold">Drop</p>
                    <p>{ride.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 px-2">
                  <i className="ri-wallet-3-fill text-[#601895] text-xl"></i>
                  <div>
                    <p className="font-bold">Fare</p>
                    <p>
                      ₹{ride.fare} • {ride.payment || "Cash"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Finish Button */}
            <button
              onClick={() => {
                updateRideStatus('completed');
                navigate("/captain-home");
              }}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-800 
              text-white rounded-xl font-bold text-lg shadow-lg 
              hover:scale-[1.02] transition"
            >
              Complete Ride
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaptainRiding;
