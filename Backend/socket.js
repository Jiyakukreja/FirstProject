const io = require('socket.io')(); // or import your existing io instance
const Captain = require('./models/captain.model');
const User = require('./models/user.model');

// Initialize socket connection
function initializeSocket(server) {
    io.attach(server);

    io.on('connection', (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);

        // Handle join events to store socket IDs
        socket.on('join', async (data) => {
            try {
                if (data.role === 'captain' && data.userId) {
                    // Update captain with socket ID and set status to active
                    await Captain.findByIdAndUpdate(data.userId, { 
                        socketId: socket.id,
                        status: 'active'
                    });
                    
                    // Send welcome message back to captain
                    socket.emit('welcome', { 
                        role: 'captain', 
                        message: 'Captain connected successfully',
                        socketId: socket.id
                    });
                    
                } else if (data.role === 'user' && data.userId) {
                    // Update user with socket ID
                    await User.findByIdAndUpdate(data.userId, { socketId: socket.id });
                    
                    // Send welcome message back to user
                    socket.emit('welcome', { 
                        role: 'user', 
                        message: 'User connected successfully',
                        socketId: socket.id
                    });
                }
            } catch (error) {
                console.error('Error handling join:', error);
            }
        });

        // Handle captain location updates
        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;
                await Captain.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error('Error updating captain location:', error);
            }
        });

        socket.on('disconnect', async () => {
            // Update captain status to inactive on disconnect
            try {
                await Captain.findOneAndUpdate(
                    { socketId: socket.id },
                    { status: 'inactive', socketId: null }
                );
            } catch (error) {
                console.error('Error updating captain status on disconnect:', error);
            }
        });
    });
}

// Send message to a specific socket ID
function sendMessageToSocketId(socketId, event, data) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
        socket.emit(event, data);
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
