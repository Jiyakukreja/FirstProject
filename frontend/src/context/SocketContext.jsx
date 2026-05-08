import React, { createContext, useEffect, useRef, useContext, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";
import { CaptainDataContext } from "./CaptainContext";

export const SocketContext = createContext();

// ✅ Connect socket
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  transports: ["websocket"], // ensure stable connection
});

const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { captain } = useContext(CaptainDataContext);
  const [rideRequest, setRideRequest] = useState(null);
  const [activeRides, setActiveRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [rideStatus, setRideStatus] = useState('idle'); // idle, accepted, in-progress, completed

  const userJoined = useRef(false);
  const captainJoined = useRef(false);

  // --- Connection logs and global ride request handling ---
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Global ride request handler - this will work for both user and captain
    socket.on("rideRequest", (data) => {
      console.log("🚗 NEW RIDE REQUEST RECEIVED IN SOCKETCONTEXT:", data);
      console.log("   Ride ID:", data._id);
      console.log("   Pickup:", data.pickup);
      console.log("   Destination:", data.destination);
      console.log("   Fare:", data.fare);
      
      setRideRequest(data);
      setActiveRides(prev => {
        const newRide = {
          _id: data._id,
          id: Date.now(),
          pickup: data.pickup,
          destination: data.destination,
          fare: data.fare,
          distance: data.distance || "Calculating...",
          estimatedTime: data.estimatedTime || "Calculating...",
          user: data.user,
          otp: data.otp,
          status: 'requested'
        };
        console.log("📝 Adding new ride to activeRides array. New length:", prev.length + 1);
        return [...prev, newRide];
      });
    });

    // Handle ride acceptance confirmation
    socket.on("rideAccepted", (data) => {
      console.log("✅ Ride accepted:", data);
      setCurrentRide(data);
      setRideStatus('accepted');
      // Remove from active rides
      setActiveRides(prev => prev.filter(ride => ride._id !== data._id));
    });

    // Handle ride status updates
    socket.on("rideUpdate", (data) => {
      console.log("🔄 Ride update:", data);
      if (currentRide && currentRide._id === data._id) {
        setCurrentRide(prev => ({ ...prev, ...data }));
        setRideStatus(data.status);
      }
    });

    // Handle ride completion
    socket.on("rideCompleted", (data) => {
      console.log("🏁 Ride completed:", data);
      setCurrentRide(data);
      setRideStatus('completed');
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("rideRequest");
      socket.off("rideAccepted");
      socket.off("rideUpdate");
      socket.off("rideCompleted");
    };
  }, []);

  // --- User join ---
  useEffect(() => {
    if (user?._id && !userJoined.current) {
      socket.emit("join", { role: "user", userId: user._id });
      userJoined.current = true;

      socket.on("welcome", (msg) => {
        // Silent welcome
      });
    }
  }, [user]);

  // --- Captain join ---
  useEffect(() => {
    if (captain?._id && !captainJoined.current) {
      socket.emit("join", { role: "captain", userId: captain._id });
      captainJoined.current = true;

      // Handle welcome message
      socket.on("welcome", (msg) => {
        console.log("Captain welcomed:", msg);
      });
    }
  }, [captain]);

  // Helper function to accept a ride
  const acceptRide = (rideData) => {
    console.log("🤝 Accepting ride:", rideData);
    setCurrentRide(rideData);
    setRideStatus('accepted');
    
    // Emit ride acceptance to backend
    socket.emit("acceptRide", {
      rideId: rideData._id,
      captainId: captain._id,
      captainLocation: {
        lat: 0, // Get from GPS
        lng: 0  // Get from GPS
      }
    });
    
    // Remove from active rides
    setActiveRides(prev => prev.filter(ride => ride._id !== rideData._id));
  };

  // Helper function to update ride status
  const updateRideStatus = (status, data = {}) => {
    setRideStatus(status);
    socket.emit("updateRideStatus", {
      rideId: currentRide?._id,
      status,
      ...data
    });
  };

  return (
    <SocketContext.Provider value={{ 
      socket, 
      rideRequest, 
      activeRides, 
      currentRide,
      rideStatus,
      setActiveRides,
      setRideRequest,
      acceptRide,
      updateRideStatus,
      setCurrentRide
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
