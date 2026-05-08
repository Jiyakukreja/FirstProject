import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import ConfirmRidePopUp from "./ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";

const RidePopUp = ({ setShowPopup }) => {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const { activeRides, setActiveRides } = useContext(SocketContext);
  const navigate = useNavigate();

  const requestCount = activeRides.length;
  const rides = activeRides;

  return (
    <AnimatePresence>
      {!expanded ? (
        <motion.div
          key="stack"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setExpanded(true)}
          className="fixed inset-0 flex items-center justify-center z-50 cursor-pointer"
        >
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-br from-[#f4e9fb] via-white to-[#d1b3ff] opacity-90 -z-30"></div>

          {/* Layered card effect */}
          <div className="absolute w-[420px] h-[270px] bg-[#d1b3ff] rounded-3xl shadow-2xl translate-x-4 translate-y-4 -z-20 border-2 border-[#601895]"></div>
          <div className="absolute w-[420px] h-[270px] bg-[#f4e9fb] rounded-3xl shadow-lg translate-x-2 translate-y-2 -z-10 border-2 border-[#601895]"></div>

          <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8 border-t-8 border-[#601895] relative z-10 border-2 border-[#601895] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#280A3E] mb-4 font-serif">
              <i className="ri-taxi-line text-[#601895] mr-2"></i>
              {requestCount} New Ride Requests
            </h2>
            {rides.length > 0 ? (
              <div className="space-y-2 text-gray-700 mb-6 text-lg">
                <p><span className="font-semibold">Pickup:</span> {rides[0].pickup}</p>
                <p><span className="font-semibold">Drop:</span> {rides[0].destination}</p>
                <p><span className="font-semibold">Fare:</span> <span className="text-[#601895] font-bold">₹{rides[0].fare}</span></p>
                <p><span className="font-semibold">Distance:</span> {rides[0].distance}</p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-700 mb-6 text-lg">
                <p className="text-center">Waiting for ride requests...</p>
              </div>
            )}
            <p className="text-center text-[#601895] font-semibold animate-pulse">
              {rides.length > 0 ? "Tap to explore more rides" : "No requests yet"}
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-[#f4e9fb] via-white to-[#d1b3ff] backdrop-blur-lg z-50 flex flex-col border-2 border-[#601895]"
          >
            {/* Header */}
            <div className="px-5 py-3 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white flex justify-center items-center shadow-lg border-b-2 border-[#601895] rounded-t-3xl relative">
              <h1 className="text-2xl font-bold font-serif flex items-center gap-2 text-center">
                <i className="ri-taxi-line text-2xl"></i> Ride Requests ({requestCount})
              </h1>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-5 px-4 py-2 bg-white text-[#601895] rounded-lg font-semibold hover:bg-[#f4e9fb] transition border-2 border-[#601895] shadow"
              >
                <i className="ri-close-line text-xl"></i> Close
              </button>
            </div>

            {/* Online Status Bar */}
            <div className="flex justify-between items-center px-4 py-1 bg-gradient-to-r from-[#f9e79f] via-[#fffbe6] to-[#f9e79f] font-semibold text-gray-800 shadow border-b-2 border-[#601895] sticky top-0 z-20 rounded-none">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-[#fffbe6] rounded-full border border-[#f9e79f] shadow text-[#601895] font-bold text-sm">
                  <i className="ri-wifi-line text-lg mr-1"></i> Online
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#601895] transition-all"></div>
              </label>
              <span className="text-sm">{requestCount} new requests</span>
            </div>

            {/* Ride Listings */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-[#f4e9fb] to-white rounded-b-3xl">
              {rides.length > 0 ? rides.map((ride) => (
                <motion.div
                  key={ride.id}
                  layout
                  className="bg-white rounded-2xl shadow-lg p-5 border-2 border-[#601895] hover:shadow-2xl transition duration-200"
                >
                  {/* User Info Header */}
                  <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#601895] to-[#280A3E] flex items-center justify-center shadow-lg">
                      <i className="ri-user-3-fill text-white text-2xl"></i>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-[#280A3E] font-serif">
                        New Ride Request
                      </h2>
                      {ride.user && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <i className="ri-account-circle-line"></i>
                          {ride.user.fullname?.firstname} {ride.user.fullname?.lastname}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ride Details */}
                  <div className="mt-4 space-y-3">
                    {/* Pickup & Drop */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center gap-1 mt-1">
                        <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                        <div className="w-0.5 h-10 bg-gray-300"></div>
                        <span className="w-3 h-3 bg-purple-800 rounded-sm"></span>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">PICKUP</p>
                          <p className="text-sm font-semibold text-gray-800">{ride.pickup}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">DESTINATION</p>
                          <p className="text-sm font-semibold text-gray-800">{ride.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Distance, Time, Fare */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-semibold">DISTANCE</p>
                        <p className="text-sm font-bold text-gray-800">{ride.distance}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-semibold">TIME</p>
                        <p className="text-sm font-bold text-gray-800">{ride.estimatedTime}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-semibold">FARE</p>
                        <p className="text-lg font-bold text-[#601895]">₹{ride.fare}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => {
                        // Remove the ignored ride from active rides
                        setActiveRides(prev => prev.filter(r => r.id !== ride.id));
                        // If no more rides, close popup
                        if (activeRides.length <= 1) {
                          setShowPopup(false);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition border-2 border-red-300 shadow-sm"
                    >
                      <i className="ri-close-circle-line text-xl"></i> 
                      Ignore
                    </button>
                    <button
                      onClick={() => { setSelectedRide(ride); setShowConfirm(true); }}
                      className="flex-[2] flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white rounded-xl font-bold hover:scale-105 transition shadow-lg"
                    >
                      <i className="ri-check-line text-lg"></i> Accept
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center text-gray-500 py-8">
                  <i className="ri-taxi-line text-4xl mb-4"></i>
                  <p className="text-xl">No ride requests yet</p>
                  <p className="text-sm">Waiting for ride requests...</p>
                </div>
              )}
            </div>
            {/* Confirm Ride PopUp */}
            {showConfirm && selectedRide && (
              <ConfirmRidePopUp
                ride={selectedRide}
                onConfirm={() => {
                  setShowConfirm(false);
                  setShowPopup(false);
                  navigate("/captain-riding");
                }}
                onIgnore={() => { 
                  setShowConfirm(false); 
                  // Remove ignored ride from active rides
                  setActiveRides(prev => prev.filter(r => r.id !== selectedRide.id));
                  // Close popup if no more rides
                  if (activeRides.length <= 1) {
                    setShowPopup(false);
                  }
                }}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RidePopUp;
