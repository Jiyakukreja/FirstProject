import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../images/image.png";
import map from "../images/map.png";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Cabinfo from "../components/Cabinfo";
import ConfirmedRide from "../components/ConfirmedRide";
import WaitingForDriver from "../components/WaitingForDriver";
import Riding from "../components/Riding";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";

// Payment Components
import Modal from "../components/Modal";
import AddPayment from "../components/AddPayment";
import Cash from "../components/Cash";
import GiftCard from "../components/GiftCard";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [showRiding, setShowRiding] = useState(false);
  const [paymentStep, setPaymentStep] = useState(null);
  const [fare, setFare] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentRideData, setCurrentRideData] = useState(null);
  const {socket, currentRide, rideStatus}= useContext(SocketContext);

  const { user } = useContext(UserContext);

  // 🔹 SOCKET.IO FIXED: Emit join only once & prevent duplicates
  useEffect(() => {
  socket.emit("join", { role: "user", userId: user?._id });


}, [user]);

  // 🎯 Listen for ride acceptance from captain
  useEffect(() => {
    const handleRideAccepted = (data) => {
      console.log("✅ Ride accepted by captain:", data);
      setCurrentRideData(data);
      setShowWaiting(true);
    };

    const handleRideStarted = (data) => {
      console.log("🚗 Ride started:", data);
      setCurrentRideData(data);
      setShowRiding(true);
      setShowWaiting(false);
    };

    socket.on("rideAccepted", handleRideAccepted);
    socket.on("rideStarted", handleRideStarted);

    return () => {
      socket.off("rideAccepted", handleRideAccepted);
      socket.off("rideStarted", handleRideStarted);
    };
  }, [socket]);


  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const formRef = useRef(null);

  // 🔎 Fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("❌ No token found in localStorage");

      const res = await axios.get("http://localhost:4000/maps/get-suggestions", {
        params: { input: query },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setSuggestions(res.data);
    } catch (err) {
      console.error("❌ Suggestion fetch error:", err);
      setSuggestions([]);
    }
  };

  // 🚖 Fetch fare
  const findTrip = async () => {
    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) setFare(response.data.fare);
    } catch (err) {
      console.error("❌ Trip fetch error:", err);
    }
  };

  // 🚘 Create ride on vehicle select
  const handleCabSelect = async (vehicleType) => {
    try {
      setSelectedVehicle(vehicleType);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
          fare: fare?.[vehicleType] || null,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log("✅ Ride Created:", response.data);
      setRideConfirmed(true);
      setVehiclePanelOpen(false);
      setPanelOpen(false);
    } catch (err) {
      console.error("❌ Ride create error:", err);
    }
  };

  // 🔘 Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && destination) findTrip();
  };

  // GSAP animations
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "40%", duration: 0.5, ease: "power2.out" });
      gsap.to(formRef.current, { y: -145, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(panelRef.current, { height: "0%", duration: 0.5, ease: "power2.in" });
      gsap.to(formRef.current, { y: 0, duration: 0.5, ease: "power2.in" });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.fromTo(
        vehiclePanelRef.current,
        { y: "100%", display: "block" },
        { y: "0%", duration: 1, ease: "power2.out" }
      );
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
        duration: 1,
        ease: "power2.in",
        onComplete: () => gsap.set(vehiclePanelRef.current, { display: "none" }),
      });
    }
  }, [vehiclePanelOpen]);

  const handleSuggestionSelect = (loc) => {
    const value = typeof loc === "string" ? loc : loc.description;
    if (activeField === "pickup") setPickup(value);
    if (activeField === "destination") setDestination(value);
    setPanelOpen(false);
    setSuggestions([]);
  };

  // --- UI Rendering ---
  if (rideConfirmed) {
    if (showRiding) return <Riding rideData={currentRideData} pickup={pickup} destination={destination} fare={fare?.[selectedVehicle]} />;
    if (showWaiting)
      return (
        <WaitingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare?.[selectedVehicle] || null}
          rideData={currentRideData}
          onCancel={() => {
            setRideConfirmed(false);
            setPickup("");
            setDestination("");
            setShowWaiting(false);
            setShowRiding(false);
            setCurrentRideData(null);
          }}
        />
      );
    return (
      <ConfirmedRide
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={selectedVehicle}
        onCancel={() => {
          setRideConfirmed(false);
          setSelectedVehicle(null);
          setPickup("");
          setDestination("");
          setPanelOpen(false);
          setVehiclePanelOpen(false);
          setShowWaiting(false);
          setShowRiding(false);
        }}
        onChangeDestination={() => {
          setRideConfirmed(false);
          setVehiclePanelOpen(false);
          setTimeout(() => setPanelOpen(true), 100);
          setShowWaiting(false);
          setShowRiding(false);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F2EDD1] flex flex-col">
      <div
        onClick={() => {
          setVehiclePanelOpen(false);
          setPanelOpen(false);
        }}
        className="absolute inset-0"
      >
        <img src={map} alt="Map" className="h-full w-full object-cover" />
      </div>
      <img
        src={logo}
        alt="Logo"
        className="absolute top-7 left-5 w-24 h-auto rounded-xl z-10"
      />

      {/* Main Card */}
      <div className="absolute bottom-0 left-0 w-full z-10 pb-10">
        <div
          ref={formRef}
          className="relative left-1/2 transform -translate-x-1/2 w-[75%] -top-28 bg-white border-4 border-gray-400 px-9 py-7 shadow-xl flex flex-col rounded-2xl border border-[#F9CB99]"
        >
          <div className="bg-gradient-to-r from-[#280A3E] to-[#4B2A63] text-[#F2EDD1] text-2xl font-serif w-auto h-auto px-10 py-3 font-semibold tracking-wider flex items-center justify-between rounded-xl shadow">
            <span>Find a Trip</span>
            <h5 onClick={() => setPanelOpen(false)}>
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-4 mt-4 relative">
              <div className="line absolute h-20 w-1 top-[18%] left-7 bg-[#280A3E] rounded-md"></div>

              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                type="text"
                placeholder="Add a pick-up Location"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  setActiveField("pickup");
                  fetchSuggestions(e.target.value);
                }}
                className="w-full p-3 px-12 bg-white text-lg font-serif border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#689B8A] rounded-lg"
                required
              />
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                placeholder="Enter your Destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setActiveField("destination");
                  fetchSuggestions(e.target.value);
                }}
                className="w-full p-3 px-12 text-lg bg-white font-serif border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#689B8A] rounded-lg"
                required
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-[#689B8A] text-white font-serif text-lg font-semibold py-3 rounded-xl shadow hover:bg-[#51756A] transition"
              >
                See Prices
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Slide-up Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 w-full h-0 z-20 shadow-2xl rounded-t-2xl overflow-y-auto"
        style={{ maxHeight: "40%" }}
      >
        <div className="relative left-1/2 transform -translate-x-1/2 w-[65%] mt-6 flex flex-col gap-4">
          <LocationSearchPanel
            suggestionList={suggestions}
            onSelectSuggestion={handleSuggestionSelect}
            onClose={() => setPanelOpen(false)}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="absolute translate-y-full bottom-0 left-0 w-full h-[90%] bg-[#280A3E] shadow-lg rounded-t-2xl px-6 py-4 z-30 flex flex-col"
      >
        <div className="flex flex-col items-center pb-3 flex-shrink-0">
          <h5
            onClick={() => setVehiclePanelOpen(false)}
            className="text-[#F2EDD1] text-3xl cursor-pointer mb-2"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h2 className="text-[#F2EDD1] text-center font-serif text-3xl font-bold">
            Choose a Vehicle
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Cabinfo fare={fare} onCabSelect={handleCabSelect} />
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={!!paymentStep} onClose={() => setPaymentStep(null)}>
        {paymentStep === "add" && (
          <AddPayment onSelect={(method) => setPaymentStep(method)} />
        )}
        {paymentStep === "cash" && (
          <Cash
            onConfirm={() => {
              setPaymentStep(null);
              setRideConfirmed(true);
            }}
          />
        )}
        {paymentStep === "giftcard" && (
          <GiftCard
            onConfirm={() => {
              setPaymentStep(null);
              setRideConfirmed(true);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;