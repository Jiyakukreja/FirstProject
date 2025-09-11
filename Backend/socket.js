const { Server } = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      try {
        const { userId, role } = data;
        console.log(`➡️ Join request => id: ${userId}, role: ${role}`);

        if (role === 'user') {
          const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );

          if (!updatedUser) {
            console.log(`❌ No user found with id: ${userId}`);
            return socket.emit("welcome", { msg: "User not found" });
          }

          socket.emit("welcome", { 
            msg: "User joined", 
            role:"User",
            userId: updatedUser._id,
            socketId: socket.id 
          });

          console.log(`✅ User ${updatedUser._id} socket updated: ${socket.id}`);

        } else if (role === 'captain') {
          const updatedCaptain = await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );

          if (!updatedCaptain) {
            console.log(`❌ No captain found with id: ${userId}`);
            return socket.emit("welcome", { msg: "Captain not found" });
          }

          socket.emit("welcome", { 
            msg: "Captain joined", 
            role:"Captain",
            captainId: updatedCaptain._id,
            socketId: socket.id 
          });

          console.log(`✅ Captain ${updatedCaptain._id} socket updated: ${socket.id}`);
        } else {
          console.log(`❌ Invalid role received: ${role}`);
        }
      } catch (err) {
        console.error("❌ Error in join event:", err.message);
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.lng || !location.ltd) {
        return console.log('❌ Invalid location data received');
      }

      await captainModel.findByIdAndUpdate(
        userId,
        { location: { ltd: location.ltd, lng: location.lng } },
        { new: true }
      );
    });

    socket.on('disconnect', () => {
      console.log(`⚠️ Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
