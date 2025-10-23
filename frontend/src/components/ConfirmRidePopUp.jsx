import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const ConfirmRidePopUp = ({ ride, onIgnore }) => {
  const [step, setStep] = useState(1); // 1: confirm, 2: ride details, 3: OTP for pickup
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { acceptRide, updateRideStatus, socket } = useContext(SocketContext);

  const gstRate = 0.18;
  const gstAmount = Math.round(ride.fare * gstRate);
  const totalAmount = ride.fare + gstAmount;

  useEffect(() => {
    if (step === 3) {
      gsap.from(".otp-input", {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    const expectedOtp = ride.otp || "1234";
    
    if (enteredOtp === expectedOtp) {
      setError("");
      
      // Emit startRide event to backend
      socket.emit('startRide', {
        rideId: ride._id
      });
      
      // Navigate to riding page
      navigate("/captain-riding");
    } else {
      setError(`Invalid OTP. Please enter ${expectedOtp}.`);
    }
  };

  // Handle confirming the ride
  const handleConfirmRide = () => {
    acceptRide(ride);
    setStep(2);
  };

  return (
    <AnimatePresence>
      {step === 1 && (
        <motion.div
          key="confirm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white w-[500px] p-8 rounded-3xl shadow-2xl border-2 border-[#601895] font-serif">
            <h2 className="text-2xl font-bold text-center text-[#280A3E] mb-6">
              Confirm Ride
            </h2>

            <div className="space-y-3 text-gray-700 text-lg font-serif">
              <div className="flex justify-between">
                <span className="font-semibold">Customer:</span>
                <span>{ride.user?.fullname ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}` : 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Pickup:</span>
                <span>{ride.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Drop:</span>
                <span>{ride.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Fare:</span>
                <span className="text-[#601895] font-bold font-sans">₹{ride.fare}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={onIgnore}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRide}
                className="px-5 py-2 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white rounded-lg font-semibold hover:scale-105 transition shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          key="details"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white w-[520px] p-8 rounded-3xl shadow-2xl border-2 border-[#601895] font-serif">
            <h2 className="text-2xl font-bold text-center text-[#280A3E] mb-6">
              Ride Details
            </h2>

            <div className="space-y-3 text-gray-700 text-lg mb-6 font-serif">
              <div className="flex justify-between">
                <span className="font-semibold">Customer:</span>
                <span>{ride.user?.fullname ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}` : 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Pickup:</span>
                <span>{ride.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Drop:</span>
                <span>{ride.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Fare:</span>
                <span className="text-[#601895] font-bold font-sans">₹{ride.fare}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">GST (18%):</span>
                <span className="text-[#601895] font-bold font-sans">₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#280A3E]">
                <span>Total Amount:</span>
                <span className="font-sans">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onIgnore}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white rounded-lg font-semibold hover:scale-105 transition shadow-lg"
              >
                Go to Pick Up
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          key="otp-pickup"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white w-[400px] p-8 rounded-3xl shadow-2xl border-2 border-[#601895] font-serif text-center">
            <h2 className="text-2xl font-bold text-[#280A3E] mb-6">Enter OTP to Start Pickup</h2>
            <p className="text-gray-600 mb-6">
              Verify OTP to start the ride pickup
            </p>

            <div className="flex justify-between mb-6">
              {otp.map((num, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength="1"
                  value={num}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpBackspace(e, i)}
                  className="otp-input w-14 h-14 border-2 border-gray-300 rounded-lg text-center text-xl font-bold font-sans focus:border-[#601895] focus:outline-none"
                />
              ))}
            </div>
            {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

            <div className="space-y-3 text-gray-700 text-lg font-serif mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">Customer:</span>
                <span>{ride.user?.fullname ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}` : 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Pickup:</span>
                <span>{ride.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Drop:</span>
                <span>{ride.destination}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onIgnore}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtp}
                className="px-5 py-2 bg-gradient-to-r from-[#601895] to-[#280A3E] text-white rounded-lg font-semibold hover:scale-105 transition shadow-lg"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmRidePopUp;
