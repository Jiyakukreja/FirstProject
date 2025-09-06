import React, { useState, useEffect } from "react";
import map from "../images/map.png";
import "remixicon/fonts/remixicon.css";
import { gsap } from "gsap";
import RidePopUp from "../components/RidePopUp";

const CaptainHome = () => {
  const [online, setOnline] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const driver = {
    name: "Ravi Kumar",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    earned: "₹12,540",
    hours: 120,
    kms: 850,
    rides: 340,
    rating: 4.8,
  };

  useEffect(() => {
    if (online) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        gsap.fromTo(
          "#ridePopup",
          { y: "-100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [online]);

  return (
    <div className="h-screen w-screen relative font-serif">
      {/* Background Map */}
      <img
        src={map}
        alt="Map"
        className="h-full w-full object-cover absolute inset-0"
      />

      {/* Right Panel */}
      <div className="absolute right-0 top-0 h-full w-[700px] bg-[#F2EDD1] shadow-2xl flex flex-col border-l border-gray-400">
        
        {/* Status Bar */}
        <div
          className={`w-full px-6 py-4 flex items-center gap-3 shadow-md border-b border-gray-400 transition-colors duration-300 ${
            online ? "bg-[#5f8f7f]" : "bg-[#601895]"
          } text-white`}
        >
          <i
            className={`${
              online ? "ri-checkbox-circle-fill" : "ri-moon-fill"
            } text-xl`}
          ></i>
          <div>
            <p className="font-semibold">
              {online ? "You are Online!" : "You are Offline!"}
            </p>
            <p className="text-sm opacity-80">
              {online
                ? "You are ready to accept rides."
                : "Go online to start accepting jobs."}
            </p>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 m-6 flex items-center justify-between hover:shadow-xl transition border border-gray-300">
          <div className="flex items-center gap-4">
            <img
              src={driver.img}
              alt="Driver"
              className="w-20 h-20 rounded-full border-4 border-gray-200 shadow"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{driver.name}</h2>
              <p className="text-sm text-gray-500">Captain</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Earnings</p>
            <p className="text-2xl font-extrabold text-[#601895]">
              {driver.earned}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 px-6 overflow-y-auto">
          <h3 className="text-gray-700 font-semibold mb-4 text-lg">Your Stats</h3>
          <div className="bg-[#f4e9fb] p-6 rounded-2xl shadow-inner border border-gray-300">
            <div className="grid grid-cols-2 gap-5">
              {/* Hours */}
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition border border-gray-200">
                <i className="ri-time-fill text-3xl text-[#601895]"></i>
                <div>
                  <p className="text-sm text-gray-500">Hours</p>
                  <p className="text-lg font-bold">{driver.hours}</p>
                </div>
              </div>
              {/* Kilometers */}
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition border border-gray-200">
                <i className="ri-road-map-fill text-3xl text-[#601895]"></i>
                <div>
                  <p className="text-sm text-gray-500">Kilometers</p>
                  <p className="text-lg font-bold">{driver.kms} km</p>
                </div>
              </div>
              {/* Rides */}
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition border border-gray-200">
                <i className="ri-taxi-fill text-3xl text-[#601895]"></i>
                <div>
                  <p className="text-sm text-gray-500">Rides</p>
                  <p className="text-lg font-bold">{driver.rides}</p>
                </div>
              </div>
              {/* Rating */}
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition border border-gray-200">
                <i className="ri-star-fill text-3xl text-yellow-500"></i>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-lg font-bold">{driver.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 py-5">
          <button
            onClick={() => setOnline(!online)}
            className="w-full py-3 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          >
            {online ? "Go Offline" : "Go Online"}
          </button>
        </div>
      </div>

      {/* Ride Popup */}
      {showPopup && <RidePopUp setShowPopup={setShowPopup} />}
    </div>
  );
};

export default CaptainHome;
