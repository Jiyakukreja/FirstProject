import React, { createContext, useEffect, useRef, useContext } from "react";
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

  const userJoined = useRef(false);
  const captainJoined = useRef(false);

  // --- Connection logs ---
  useEffect(() => {
    socket.on("connect", () => {
      // Silent connection
    });

    socket.on("disconnect", (reason) => {
      // Silent disconnection
    });

    return () => socket.off();
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
        // Silent welcome
      });

      // Handle ride requests - only log ride request with user info
      socket.on("rideRequest", (rideData) => {
        console.log("Ride Request:", {
          pickup: rideData.pickup,
          destination: rideData.destination,
          fare: rideData.fare,
          user: rideData.user
        });
      });
    }
  }, [captain]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
