import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import mapImg from "../images/map.png"; // apna map image lagao
import "remixicon/fonts/remixicon.css";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [showFinish, setShowFinish] = useState(false);
  const [distance, setDistance] = useState("4 kms away");
  const navigate = useNavigate();
  const { currentRide, rideStatus, updateRideStatus, socket } = useContext(SocketContext);

  // If no current ride, redirect back to captain home
  useEffect(() => {
    if (!currentRide) {
      console.warn("No current ride data, redirecting to captain home");
      navigate("/captain/home");
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
    <div className="relative w-full h-screen bg-cover bg-center font-serif overflow-hidden">
      <LiveTracking />
      {/* Animated Top Status Bar with Pulse Effect */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 
        bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 
        px-6 py-2.5 rounded-full shadow-xl z-20 flex items-center gap-2
        border-2 border-white/30 backdrop-blur-sm"
      >
        <div className="relative">
          <i className="ri-map-pin-line text-white text-lg animate-pulse"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        </div>
        <span className="text-white font-bold text-sm tracking-wide">Ride In Progress</span>
        <div className="flex gap-1 ml-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </motion.div>

      {/* Enhanced Bottom Ride Info Bar */}
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute bottom-0 left-0 h-28 w-full 
        bg-gradient-to-br from-white via-gray-50 to-purple-50
        backdrop-blur-xl shadow-2xl 
        border-t-4 border-[#601895]
        rounded-t-3xl px-6 py-4 flex justify-between items-center
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:to-pink-500/5 before:rounded-t-3xl"
      >
        {/* Location + Distance with Enhanced Design */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#601895] to-[#280A3E] rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-map-pin-2-fill text-white text-lg"></i>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Distance to Destination</p>
              <p className="text-gray-900 font-bold text-xl tracking-wide">
                {distance}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Complete Ride Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFinish(true)}
          className="relative px-6 py-3 bg-gradient-to-r from-[#601895] via-[#7B1FA2] to-[#280A3E] 
          text-white rounded-xl font-bold text-sm shadow-xl 
          transition-all duration-300 flex items-center gap-2
          border-2 border-white/20 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          <i className="ri-flag-fill text-lg relative z-10"></i>
          <span className="relative z-10">Complete Ride</span>
        </motion.button>
      </motion.div>

      {/* Enhanced Slide-up Finish Ride Panel */}
      <AnimatePresence>
        {showFinish && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFinish(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, type: "spring", damping: 25 }}
              className="absolute bottom-0 left-0 w-full h-[75%] 
              bg-gradient-to-b from-white to-gray-50
              p-4 rounded-t-3xl shadow-2xl z-30 flex flex-col justify-between
              border-t-4 border-[#601895] overflow-hidden"
            >
              <div className="overflow-y-auto scrollbar-hide flex-1">
                {/* Close Handle Bar */}
                <div className="flex justify-center mb-3">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowFinish(false)}
                    className="cursor-pointer"
                  >
                    <div className="w-12 h-1 bg-gray-300 rounded-full mb-1"></div>
                    <i className="ri-arrow-down-s-line text-2xl text-gray-600 hover:text-black transition block text-center"></i>
                  </motion.div>
                </div>

                {/* Enhanced Heading with Icon */}
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-center 
                    bg-gradient-to-r from-[#601895] via-[#7B1FA2] to-[#280A3E] 
                    text-transparent bg-clip-text tracking-wide 
                    flex items-center justify-center gap-2 drop-shadow-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#601895] to-[#280A3E] rounded-full flex items-center justify-center">
                      <i className="ri-flag-checkered-fill text-white text-sm"></i>
                    </div>
                    <span>Finish this Ride</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#601895] to-[#280A3E] rounded-full mx-auto mt-2"></div>
                </div>

                {/* Enhanced Passenger Info Card */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative bg-gradient-to-br from-[#F2EDD1] via-[#e8dfc9] to-[#f5ecd4]
                  p-4 rounded-xl shadow-lg mb-4 border-2 border-[#601895]
                  overflow-hidden"
                >
                  {/* Decorative Element */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#601895]/10 rounded-full blur-2xl"></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={ride.user?.profileImage || "https://randomuser.me/api/portraits/women/45.jpg"}
                          alt={passenger}
                          className="w-14 h-14 rounded-xl object-cover border-3 border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <i className="ri-user-star-fill text-white text-[8px]"></i>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 font-bold mb-0.5 uppercase tracking-wider">Passenger</p>
                        <p className="font-bold text-lg text-[#280A3E]">{passenger}</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <i className="ri-star-fill text-yellow-500 text-xs"></i>
                          <i className="ri-star-fill text-yellow-500 text-xs"></i>
                          <i className="ri-star-fill text-yellow-500 text-xs"></i>
                          <i className="ri-star-fill text-yellow-500 text-xs"></i>
                          <i className="ri-star-half-fill text-yellow-500 text-xs"></i>
                          <span className="text-[10px] text-gray-600 ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-600 font-bold mb-0.5 uppercase tracking-wider">Distance</p>
                      <p className="font-bold text-lg text-[#601895]">{ride.distance || "Calculating..."}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Total journey</p>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Ride Details */}
                <div className="space-y-3 text-gray-800">
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-3 rounded-xl shadow-md border-2 border-green-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <i className="ri-map-pin-2-fill text-white text-lg"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-500 mb-0.5 uppercase tracking-wider">Pickup Location</p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight truncate">{ride.pickup}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-3 rounded-xl shadow-md border-2 border-purple-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-[#601895] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <i className="ri-map-pin-user-fill text-white text-lg"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-500 mb-0.5 uppercase tracking-wider">Drop Location</p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight truncate">{ride.destination}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative bg-gradient-to-br from-[#601895] via-[#7B1FA2] to-[#280A3E] p-3 rounded-xl shadow-lg overflow-hidden"
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full blur-xl"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <i className="ri-wallet-3-fill text-[#601895] text-lg"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-white/90 mb-0.5 uppercase tracking-wider">Fare Amount</p>
                        <p className="text-2xl font-extrabold text-white flex items-center gap-2">
                          ₹{ride.fare}
                          <span className="text-xs font-normal text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                            {ride.payment || "Cash"}
                          </span>
                        </p>
                      </div>
                      <i className="ri-money-rupee-circle-fill text-white/20 text-4xl"></i>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Finish Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => {
                  console.log("Completing ride:", currentRide?._id);
                  
                  // Emit completeRide to backend
                  socket.emit('completeRide', {
                    rideId: currentRide?._id
                  });
                  
                  // Show success message
                  alert(`✅ Ride completed successfully!\n\nFare collected: ₹${ride.fare}`);
                  
                  // Navigate back to captain home immediately
                  navigate("/captain/home");
                }}
                className="relative w-full py-3.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600
                text-white rounded-xl font-bold text-base shadow-xl 
                transition-all flex items-center justify-center gap-2
                border-2 border-white/30 overflow-hidden group mt-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <i className="ri-checkbox-circle-fill text-lg relative z-10"></i>
                <span className="relative z-10">Complete Ride & Return Home</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaptainRiding;
