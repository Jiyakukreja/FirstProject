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
      console.log("🚗 New ride request received in SocketContext:", data);
      setRideRequest(data);
      setActiveRides(prev => {
        const newRide = {
          id: Date.now(),
          pickup: data.pickup,
          destination: data.destination,
          fare: data.fare,
          distance: data.distance || "Calculating...",
          estimatedTime: data.estimatedTime || "Calculating...",
          user: data.user
        };
        console.log("📝 Adding new ride to activeRides:", newRide);
        return [...prev, newRide];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("rideRequest");
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

  return (
    <SocketContext.Provider value={{ 
      socket, 
      rideRequest, 
      activeRides, 
      setActiveRides,
      setRideRequest 
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
