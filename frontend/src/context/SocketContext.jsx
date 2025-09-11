import React, { createContext, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";
import { CaptainDataContext } from "./CaptainContext";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { captain } = useContext(CaptainDataContext);

  const userJoined = useRef(false);
  const captainJoined = useRef(false);

  // Base connect/disconnect logs
  useEffect(() => {
    socket.on("connect", () => console.log("✅ Connected to server:", socket.id));
    socket.on("disconnect", () => console.log("❌ Disconnected from server"));

    return () => socket.off(); // cleanup on unmount
  }, []);

  // User join
  useEffect(() => {
    if (user?._id && !userJoined.current) {
      socket.emit("join", { role: "user", userId: user._id });
      console.log(`📤 Emitted join for userId: ${user._id}`);
      userJoined.current = true;

      const handleUserWelcome = (msg) => {
        if (msg.role?.toLowerCase() === "user") {
          console.log("🎉 Server response for user:", msg);
        }
      };

      socket.on("welcome", handleUserWelcome);
      return () => socket.off("welcome", handleUserWelcome);
    }
  }, [user]);

  // Captain join
  useEffect(() => {
    if (captain?._id && !captainJoined.current) {
      socket.emit("join", { role: "captain", userId: captain._id });
      console.log(`📤 Emitted join for captainId: ${captain._id}`);
      captainJoined.current = true;

      const handleCaptainWelcome = (msg) => {
        if (msg.role?.toLowerCase() === "captain") {
          console.log("🎉 Server response for captain:", msg);
        }
      };

      socket.on("welcome", handleCaptainWelcome);
      return () => socket.off("welcome", handleCaptainWelcome);
    }
  }, [captain]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
