import React, { useState, useEffect, useContext } from "react";
import map from "../images/map.png";
import "remixicon/fonts/remixicon.css";
import { gsap } from "gsap";
import RidePopUp from "../components/RidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [online, setOnline] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // --- Handle ride requests + location updates ---
  useEffect(() => {
    if (!socket || !captain?._id) return;

    console.log("🧑‍✈️ Captain active:", captain._id);
    console.log("🛰️ Socket connected with ID:", socket.id);

    // --- Handle ride requests ---
    const handleRideRequest = (rideData) => {
      console.log("🚖 New ride request received:", rideData);
      setShowPopup(true);
      gsap.fromTo("#ridePopup", { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8 });
    };

    socket.on("rideRequest", handleRideRequest);

    // --- Update location every 15 seconds ---
    const updateLocation = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const data = {
            userId: captain._id,
            location: {
              ltd: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          };
          console.log("📍 Sending location update:", data);
          socket.emit("update-location-captain", data);
        },
        (err) => console.error("❌ Geolocation error:", err)
      );
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 15000); // every 15s

    return () => {
      socket.off("rideRequest", handleRideRequest);
      clearInterval(locationInterval);
    };
  }, [socket, captain?._id]); // ✅ only rerun when captainId changes

  // --- Capitalize helper ---
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const fullname = captain?.fullname
    ? `${capitalize(captain.fullname.firstname)} ${capitalize(captain.fullname.lastname)}`
    : "Captain Name";

  const earnings = captain?.earnings || "₹12,540";
  const stats = {
    hours: captain?.hours || 120,
    kms: captain?.kms || 850,
    rides: captain?.rides || 340,
    rating: captain?.rating || 4.8,
  };

  // --- Popup control ---
  useEffect(() => {
    if (online) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [online]);

  return (
    <div className="h-screen w-screen relative font-serif">
      <img src={map} alt="Map" className="h-full w-full object-cover absolute inset-0" />

      {/* Right Panel */}
      <div className="absolute right-0 top-0 h-full w-[700px] bg-[#F2EDD1] shadow-2xl flex flex-col border-l border-gray-400">

        {/* Status Bar */}
        <div
          className={`w-full px-6 py-4 flex items-center gap-3 shadow-md border-b border-gray-400 transition-colors duration-300 ${
            online ? "bg-[#5f8f7f]" : "bg-[#601895]"
          } text-white`}
        >
          <i className={`${online ? "ri-checkbox-circle-fill" : "ri-moon-fill"} text-xl`}></i>
          <div>
            <p className="font-semibold">{online ? "You are Online!" : "You are Offline!"}</p>
            <p className="text-sm opacity-80">
              {online ? "You are ready to accept rides." : "Go online to start accepting jobs."}
            </p>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 m-6 flex items-center justify-between hover:shadow-xl transition border border-gray-300">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Driver"
              className="w-20 h-20 rounded-full border-4 border-gray-200 shadow"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fullname}</h2>
              <p className="text-sm text-gray-500">{captain?.vehicle?.vehicleType || "Captain"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Earnings</p>
            <p className="text-2xl font-extrabold text-[#601895]">{earnings}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 px-6 overflow-y-auto">
          <h3 className="text-gray-700 font-semibold mb-4 text-lg">Your Stats</h3>
          <div className="bg-[#f4e9fb] p-6 rounded-2xl shadow-inner border border-gray-300">
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: "Hours", value: stats.hours, icon: "ri-time-fill" },
                { label: "Kilometers", value: `${stats.kms} km`, icon: "ri-road-map-fill" },
                { label: "Rides", value: stats.rides, icon: "ri-taxi-fill" },
                { label: "Rating", value: stats.rating, icon: "ri-star-fill" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md flex items-center gap-3 hover:shadow-lg transition border border-gray-200"
                >
                  <i className={`${stat.icon} text-3xl text-[#601895]`}></i>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Online/Offline Button */}
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
