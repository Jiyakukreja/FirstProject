import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import map from "../images/map.png";
import logbg from "../images/logobg.png";
import scanner from "../images/scanner.jpeg";
import 'remixicon/fonts/remixicon.css';
import { gsap } from "gsap";

const Riding = ({ rideData, pickup, destination: destinationProp, fare }) => {
  // Get captain and ride data
  const captain = rideData?.ride?.captain || rideData?.captain;
  
  const driver = captain ? {
    name: `${captain.fullname?.firstname || ''} ${captain.fullname?.lastname || ''}`.trim() || "Driver",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    car: {
      model: `${captain.vehicle?.vehicleType || 'Car'}`,
      color: captain.vehicle?.color || "Unknown"
    },
    plate: captain.vehicle?.plate || "N/A",
    fare: fare || rideData?.ride?.fare || (120).toFixed(2),
  } : {
    name: "Driver",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    car: { model: "Car", color: "Unknown" },
    plate: "N/A",
    fare: fare || (120).toFixed(2),
  };

  const otpString = rideData?.ride?.otp || rideData?.otp || "1234";
  const otp = otpString.split('').slice(0, 4);
  const destination = destinationProp || rideData?.ride?.destination || "Destination";

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [timer, setTimer] = useState(30);

  const popupRef = useRef(null);

  // GSAP animation for popup
  useEffect(() => {
    if (showPopup && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { scale: 0.5, opacity: 0, y: -50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [showPopup]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (showScanner) {
      setTimer(30); // reset to 30 sec
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowScanner(false); // hide scanner after 30 sec
            setShowPopup(false);   // close popup
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showScanner]);

  return (
    <div className="h-screen relative font-serif">
      {/* Home Icon */}
      <div className="absolute top-6 left-6 z-30">
        <button
          onClick={() => navigate("/home")}
          className="bg-white rounded-full shadow-lg p-3 flex items-center justify-center hover:bg-gray-100 transition border border-gray-300"
          title="Go to Home"
        >
          <i className="ri-home-4-line text-2xl text-[#280A3E]"></i>
        </button>
      </div>

      {/* Background Map */}
      <div className="h-screen">
        <img src={map} alt="Map" className="h-full w-full object-cover" />
      </div>

      {/* Ride Info Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[95%] md:w-[80%] lg:w-[60%] bg-white rounded-3xl h-[85%] shadow-2xl border border-gray-300 overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#280A3E] text-[#F2EDD1] px-6 py-4 text-center">
          <h2 className="text-xl font-bold font-serif flex justify-center items-center gap-2">
            <i className="ri-steering-2-fill"></i> You are Riding
          </h2>
          <div className="bg-[#601895] h-1 rounded-full mt-2"></div>
        </div>

        {/* Content: Left Image + Right Info */}
        <div className="flex h-full">
          {/* Left Side - Image */}
          <div className="w-[50%] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <img src={logbg} alt="Cab Illustration" className="max-h-[60%] object-contain drop-shadow-lg rounded-2xl" />
          </div>

          {/* Right Side - Details */}
          <div className="w-1/2 flex flex-col h-full">
            {/* Top Content */}
            <div className="flex-1 overflow-y-auto">
              {/* OTP Section */}
              <div className="bg-gray-50 py-4 flex items-center justify-between px-6 rounded-t-xl">
                <p className="text-sm font-serif font-semibold text-gray-700 flex items-center gap-2">
                  <i className="ri-key-2-fill text-[#601895]"> </i> Ride PIN
                </p>
                <div className="flex gap-2">
                  {otp.map((num, i) => (
                    <span
                      key={i}
                      className="w-10 h-10 flex items-center justify-center bg-[#689b8a] text-white font-bold rounded-lg shadow-lg text-lg"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-center gap-4 p-4 border-b">
                <img
                  src={driver.img}
                  alt="Driver"
                  className="w-16 h-16 rounded-full border-2 border-[#689b8a] shadow"
                />
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-800">{driver.name}</p>
                  <p className="text-xs text-gray-500">{driver.plate}</p>
                  <p className="text-sm text-gray-600">
                    {driver.car.color} {driver.car.model}
                  </p>
                </div>
              </div>

              {/* Fare Info */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="flex items-center gap-2 text-gray-700 font-bold text-lg">
                  <i className="ri-money-rupee-circle-fill text-[#601895]"> </i> Fare
                </span>
                <span className="text-2xl font-semibold text-[#601895]">
                  ₹{driver.fare}
                </span>
              </div>

              {/* Destination */}
              <div className="p-4 border-b">
                <p className="text-gray-700 font-semibold flex items-center gap-2">
                  <i className="ri-map-pin-fill text-[#601895]"> </i> Destination
                </p>
                <p className="text-gray-600 text-base mt-1">{destination}</p>
              </div>
            </div>

            {/* Payment Button - always at bottom, clear and usable */}
            <div className="p-4 bg-gradient-to-r from-[#689b8a] to-[#578674] sticky bottom-0 z-10 rounded-b-2xl shadow-lg">
              <button 
                onClick={() => setShowPopup(true)} 
                className="w-full py-3 bg-[#280A3E] text-white font-serif font-semibold rounded-xl text-lg tracking-wide hover:bg-[#601895] transition border-2 border-[#601895]"
              >
                Make a Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      {showPopup && (
        <div className="fixed font-serif inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={popupRef}
            className="bg-white rounded-2xl p-6 w-[90%] md:w-[400px] text-center shadow-2xl"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Pay ₹{driver.fare} to your Driver
            </h2>

            {!showScanner ? (
              <button
                onClick={() => setShowScanner(true)}
                className=" w-full py-2 mt-2 bg-[#280A3E] text-white rounded-lg hover:bg-[#601895] transition"
              >
                Make a Payment Online
              </button>
            ) : (
              <div>
                <img 
                  src={scanner} 
                  alt="Scanner" 
                  className="w-full h-48 p-3 object-contain mb-4 rounded-lg shadow-md" 
                />
                <p className="text-gray-700 font-semibold">
                  Closing in {timer} sec...
                </p>
              </div>
            )}

            <button 
              onClick={() => { setShowPopup(false); setShowScanner(false); }} 
              className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Riding;
