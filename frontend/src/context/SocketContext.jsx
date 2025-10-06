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
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected from server:", reason);
    });

    return () => socket.off();
  }, []);

  // --- User join ---
  useEffect(() => {
    if (user?._id && !userJoined.current) {
      socket.emit("join", { role: "user", userId: user._id });
      console.log("📤 User joined socket:", user._id);
      userJoined.current = true;

      socket.on("welcome", (msg) => {
        if (msg.role?.toLowerCase() === "user")
          console.log("🎉 Welcome message for user:", msg);
      });
    }
  }, [user]);

  // --- Captain join ---
  useEffect(() => {
    if (captain?._id && !captainJoined.current) {
      socket.emit("join", { role: "captain", userId: captain._id });
      console.log("📤 Captain joined socket:", captain._id);
      captainJoined.current = true;

      socket.on("welcome", (msg) => {
        if (msg.role?.toLowerCase() === "captain")
          console.log("🎉 Welcome message for captain:", msg);
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
