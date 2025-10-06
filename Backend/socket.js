const io = require('socket.io')(); // or import your existing io instance

// Initialize socket connection
function initializeSocket(server) {
    io.attach(server);

    io.on('connection', (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`⚡ Socket disconnected: ${socket.id}`);
        });
    });
}

// Send message to a specific socket ID
function sendMessageToSocketId(socketId, event, data) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
        socket.emit(event, data);
        console.log(`📨 Sent event "${event}" to socketId ${socketId}:`, data);
    } else {
        console.log(`❌ No active socket found for socketId: ${socketId}`);
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
