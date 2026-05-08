const io = require('socket.io')(); // or import your existing io instance
const Captain = require('./models/captain.model');
const User = require('./models/user.model');

// Initialize socket connection
function initializeSocket(server) {
    io.attach(server);

    io.on('connection', (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);
        
        // Initialize user data on socket - prevents null reference errors
        socket.user = null;
        socket.captain = null;
        socket.userRole = null;
        
        console.log(`🔍 Socket ${socket.id} initialized with null user data`);

        // Handle join events to store socket IDs and user info
        socket.on('join', async (data) => {
            try {
                console.log(`👋 Join event received for socket ${socket.id}:`, data);
                
                if (data.role === 'captain' && data.userId) {
                    // Find and store captain data on socket
                    const captain = await Captain.findByIdAndUpdate(data.userId, { 
                        socketId: socket.id,
                        status: 'active'
                    }, { new: true });
                    
                    if (captain) {
                        // Store captain info on socket to prevent null errors
                        socket.captain = captain;
                        socket.user = captain; // For backward compatibility
                        socket.userRole = 'captain';
                        
                        console.log(`✅ Captain ${data.userId} (${captain.fullname.firstname} ${captain.fullname.lastname}) joined with socket ${socket.id}`);
                        console.log(`   Status: ${captain.status}, SocketId: ${captain.socketId}`);
                        
                        // Send welcome message back to captain
                        socket.emit('welcome', { 
                            role: 'captain', 
                            message: 'Captain connected successfully',
                            socketId: socket.id,
                            captain: {
                                id: captain._id,
                                name: `${captain.fullname.firstname} ${captain.fullname.lastname}`,
                                status: captain.status
                            }
                        });
                    } else {
                        console.log(`❌ Captain ${data.userId} not found in database`);
                        socket.emit('joinError', { message: 'Captain not found' });
                    }
                    
                } else if (data.role === 'user' && data.userId) {
                    // Find and store user data on socket
                    const user = await User.findByIdAndUpdate(data.userId, { 
                        socketId: socket.id 
                    }, { new: true });
                    
                    if (user) {
                        // Store user info on socket to prevent null errors
                        socket.user = user;
                        socket.userRole = 'user';
                        
                        console.log(`✅ User ${data.userId} joined and stored on socket ${socket.id}`);
                        
                        // Send welcome message back to user
                        socket.emit('welcome', { 
                            role: 'user', 
                            message: 'User connected successfully',
                            socketId: socket.id
                        });
                    } else {
                        console.log(`❌ User ${data.userId} not found in database`);
                        socket.emit('joinError', { message: 'User not found' });
                    }
                } else {
                    console.log(`❌ Invalid join data received:`, data);
                    socket.emit('joinError', { message: 'Invalid role or userId' });
                }
            } catch (error) {
                console.error(`❌ Error handling join for socket ${socket.id}:`, error);
                socket.emit('joinError', { message: 'Server error during join' });
            }
        });

        // Handle captain location updates
        socket.on('update-location-captain', async (data) => {
            try {
                console.log(`📍 Location update received from socket ${socket.id}:`, data);
                
                // Safety check: Ensure we have user data or userId from the event
                const userId = data.userId || (socket.captain && socket.captain._id) || (socket.user && socket.user._id);
                
                if (!userId) {
                    console.log(`❌ No userId available for location update on socket ${socket.id}`);
                    socket.emit('locationUpdateError', { message: 'User not authenticated for location update' });
                    return;
                }
                
                const { location } = data;
                if (!location || !location.ltd || !location.lng) {
                    console.log(`❌ Invalid location data from socket ${socket.id}:`, location);
                    socket.emit('locationUpdateError', { message: 'Invalid location data' });
                    return;
                }
                
                await Captain.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
                
                console.log(`✅ Location updated for captain ${userId} from socket ${socket.id}`);
            } catch (error) {
                console.error(`❌ Error updating captain location for socket ${socket.id}:`, error);
                socket.emit('locationUpdateError', { message: 'Error updating location' });
            }
        });

        // Handle ride acceptance
        socket.on('acceptRide', async (data) => {
            try {
                console.log(`🤝 Accept ride request received from socket ${socket.id}:`, data);
                
                // Safety check: Ensure we have authenticated user/captain
                const captainId = data.captainId || (socket.captain && socket.captain._id) || (socket.user && socket.user._id);
                
                if (!captainId) {
                    console.log(`❌ No captain authentication for acceptRide on socket ${socket.id}`);
                    console.log(`Socket user data: socket.user = ${socket.user}, socket.captain = ${socket.captain}, socket.userRole = ${socket.userRole}`);
                    socket.emit('rideAcceptedConfirm', { 
                        success: false, 
                        error: 'Captain not authenticated. Please reconnect.' 
                    });
                    return;
                }
                
                const { rideId, captainLocation } = data;
                
                if (!rideId) {
                    console.log(`❌ No rideId provided for acceptRide on socket ${socket.id}`);
                    socket.emit('rideAcceptedConfirm', { 
                        success: false, 
                        error: 'Ride ID is required' 
                    });
                    return;
                }
                
                console.log(`🔄 Processing ride acceptance: rideId=${rideId}, captainId=${captainId}`);
                
                // Update ride with captain information
                const ride = await require('./models/ride.model').findByIdAndUpdate(rideId, {
                    captain: captainId,
                    status: 'accepted'
                }, { new: true }).populate('user captain');
                
                if (!ride) {
                    console.log(`❌ Ride ${rideId} not found for acceptance`);
                    socket.emit('rideAcceptedConfirm', { 
                        success: false, 
                        error: 'Ride not found' 
                    });
                    return;
                }
                
                // Notify user that ride was accepted
                if (ride.user && ride.user._id) {
                    const user = await User.findById(ride.user._id);
                    if (user && user.socketId) {
                        console.log(`📤 Notifying user ${user._id} about ride acceptance`);
                        sendMessageToSocketId(user.socketId, 'rideAccepted', {
                            ride,
                            captain: ride.captain,
                            estimatedArrival: '5-10 mins'
                        });
                    } else {
                        console.log(`⚠️ User ${ride.user._id} not connected or no socketId`);
                    }
                } else {
                    console.log(`❌ No user data found in ride ${rideId}`);
                }
                
                // Confirm acceptance to captain
                socket.emit('rideAcceptedConfirm', { success: true, ride });
                
                console.log(`✅ Ride ${rideId} accepted by captain ${captainId}`);
            } catch (error) {
                console.error(`❌ Error accepting ride for socket ${socket.id}:`, error);
                socket.emit('rideAcceptedConfirm', { 
                    success: false, 
                    error: error.message || 'Server error during ride acceptance' 
                });
            }
        });

        // Handle ride status updates
        socket.on('updateRideStatus', async (data) => {
            try {
                console.log(`🔄 Update ride status request received from socket ${socket.id}:`, data);
                
                // Safety check: Ensure we have authenticated user
                const userId = (socket.captain && socket.captain._id) || (socket.user && socket.user._id);
                
                if (!userId) {
                    console.log(`❌ No user authentication for updateRideStatus on socket ${socket.id}`);
                    console.log(`Socket user data: socket.user = ${socket.user}, socket.captain = ${socket.captain}, socket.userRole = ${socket.userRole}`);
                    socket.emit('rideUpdateError', { 
                        error: 'User not authenticated. Please reconnect.' 
                    });
                    return;
                }
                
                const { rideId, status, ...additionalData } = data;
                
                if (!rideId || !status) {
                    console.log(`❌ Missing required data for updateRideStatus on socket ${socket.id}: rideId=${rideId}, status=${status}`);
                    socket.emit('rideUpdateError', { 
                        error: 'Ride ID and status are required' 
                    });
                    return;
                }
                
                console.log(`🔄 Processing ride status update: rideId=${rideId}, status=${status}, userId=${userId}`);
                
                const ride = await require('./models/ride.model').findByIdAndUpdate(rideId, {
                    status,
                    ...additionalData
                }, { new: true }).populate('user captain');
                
                if (!ride) {
                    console.log(`❌ Ride ${rideId} not found for status update`);
                    socket.emit('rideUpdateError', { 
                        error: 'Ride not found' 
                    });
                    return;
                }
                
                // Verify that the user has permission to update this ride
                const isAuthorized = (
                    (socket.userRole === 'captain' && ride.captain && ride.captain._id.toString() === userId.toString()) ||
                    (socket.userRole === 'user' && ride.user && ride.user._id.toString() === userId.toString())
                );
                
                if (!isAuthorized) {
                    console.log(`❌ Unauthorized ride update attempt: userId=${userId}, rideId=${rideId}, userRole=${socket.userRole}`);
                    socket.emit('rideUpdateError', { 
                        error: 'Not authorized to update this ride' 
                    });
                    return;
                }
                
                // Notify both user and captain about status update
                if (ride.user && ride.user.socketId) {
                    console.log(`📤 Notifying user ${ride.user._id} about ride status update`);
                    sendMessageToSocketId(ride.user.socketId, 'rideUpdate', ride);
                }
                if (ride.captain && ride.captain.socketId) {
                    console.log(`📤 Notifying captain ${ride.captain._id} about ride status update`);
                    sendMessageToSocketId(ride.captain.socketId, 'rideUpdate', ride);
                }
                
                // Confirm update to requester
                socket.emit('rideUpdateConfirm', { success: true, ride });
                
                console.log(`✅ Ride ${rideId} status updated to: ${status} by ${socket.userRole} ${userId}`);
            } catch (error) {
                console.error(`❌ Error updating ride status for socket ${socket.id}:`, error);
                socket.emit('rideUpdateError', { 
                    error: error.message || 'Server error during ride status update' 
                });
            }
        });

        // Handle ride start - when captain starts the ride after picking up user
        socket.on('startRide', async (data) => {
            try {
                console.log(`🚗 Start ride request received from socket ${socket.id}:`, data);
                
                const captainId = data.captainId || (socket.captain && socket.captain._id) || (socket.user && socket.user._id);
                
                if (!captainId) {
                    console.log(`❌ No captain authentication for startRide on socket ${socket.id}`);
                    socket.emit('rideStartError', { 
                        error: 'Captain not authenticated. Please reconnect.' 
                    });
                    return;
                }
                
                const { rideId } = data;
                
                if (!rideId) {
                    console.log(`❌ No rideId provided for startRide on socket ${socket.id}`);
                    socket.emit('rideStartError', { 
                        error: 'Ride ID is required' 
                    });
                    return;
                }
                
                console.log(`🔄 Processing ride start: rideId=${rideId}, captainId=${captainId}`);
                
                // Update ride status to 'in-progress'
                const ride = await require('./models/ride.model').findByIdAndUpdate(rideId, {
                    status: 'in-progress',
                    startedAt: new Date()
                }, { new: true }).populate('user captain');
                
                if (!ride) {
                    console.log(`❌ Ride ${rideId} not found for starting`);
                    socket.emit('rideStartError', { 
                        error: 'Ride not found' 
                    });
                    return;
                }
                
                // Notify user that ride has started
                if (ride.user && ride.user.socketId) {
                    console.log(`📤 Notifying user ${ride.user._id} that ride has started`);
                    sendMessageToSocketId(ride.user.socketId, 'rideStarted', {
                        ride,
                        captain: ride.captain,
                        message: 'Your ride has started'
                    });
                }
                
                // Confirm to captain
                socket.emit('rideStartConfirm', { success: true, ride });
                
                console.log(`✅ Ride ${rideId} started by captain ${captainId}`);
            } catch (error) {
                console.error(`❌ Error starting ride for socket ${socket.id}:`, error);
                socket.emit('rideStartError', { 
                    error: error.message || 'Server error during ride start' 
                });
            }
        });

        // Handle ride completion - when captain finishes the ride
        socket.on('completeRide', async (data) => {
            try {
                console.log(`🏁 Complete ride request received from socket ${socket.id}:`, data);
                
                const captainId = data.captainId || (socket.captain && socket.captain._id) || (socket.user && socket.user._id);
                
                if (!captainId) {
                    console.log(`❌ No captain authentication for completeRide on socket ${socket.id}`);
                    socket.emit('rideCompleteError', { 
                        error: 'Captain not authenticated. Please reconnect.' 
                    });
                    return;
                }
                
                const { rideId } = data;
                
                if (!rideId) {
                    console.log(`❌ No rideId provided for completeRide on socket ${socket.id}`);
                    socket.emit('rideCompleteError', { 
                        error: 'Ride ID is required' 
                    });
                    return;
                }
                
                console.log(`🔄 Processing ride completion: rideId=${rideId}, captainId=${captainId}`);
                
                // Update ride status to 'completed'
                const ride = await require('./models/ride.model').findByIdAndUpdate(rideId, {
                    status: 'completed',
                    completedAt: new Date()
                }, { new: true }).populate('user captain');
                
                if (!ride) {
                    console.log(`❌ Ride ${rideId} not found for completion`);
                    socket.emit('rideCompleteError', { 
                        error: 'Ride not found' 
                    });
                    return;
                }
                
                // Notify user that ride has been completed
                if (ride.user && ride.user.socketId) {
                    console.log(`📤 Notifying user ${ride.user._id} that ride has been completed`);
                    sendMessageToSocketId(ride.user.socketId, 'rideCompleted', {
                        ride,
                        captain: ride.captain,
                        message: 'Your ride has been completed. Thank you!'
                    });
                }
                
                // Confirm to captain
                socket.emit('rideCompleteConfirm', { success: true, ride });
                
                console.log(`✅ Ride ${rideId} completed by captain ${captainId}`);
            } catch (error) {
                console.error(`❌ Error completing ride for socket ${socket.id}:`, error);
                socket.emit('rideCompleteError', { 
                    error: error.message || 'Server error during ride completion' 
                });
            }
        });

        socket.on('disconnect', async () => {
            console.log(`🔌 Socket ${socket.id} disconnecting...`);
            
            try {
                // Update captain status to inactive on disconnect
                if (socket.captain && socket.captain._id) {
                    await Captain.findByIdAndUpdate(socket.captain._id, { 
                        status: 'inactive', 
                        socketId: null 
                    });
                    console.log(`✅ Captain ${socket.captain._id} set to inactive on disconnect`);
                } else {
                    // Fallback: try to find captain by socketId
                    const captain = await Captain.findOneAndUpdate(
                        { socketId: socket.id },
                        { status: 'inactive', socketId: null }
                    );
                    if (captain) {
                        console.log(`✅ Captain ${captain._id} found by socketId and set to inactive`);
                    }
                }
                
                // Clean up user socketId on disconnect
                if (socket.user && socket.user._id && socket.userRole === 'user') {
                    await User.findByIdAndUpdate(socket.user._id, { 
                        socketId: null 
                    });
                    console.log(`✅ User ${socket.user._id} socketId cleared on disconnect`);
                } else {
                    // Fallback: try to find user by socketId
                    const user = await User.findOneAndUpdate(
                        { socketId: socket.id },
                        { socketId: null }
                    );
                    if (user) {
                        console.log(`✅ User ${user._id} found by socketId and cleared`);
                    }
                }
                
            } catch (error) {
                console.error(`❌ Error during disconnect cleanup for socket ${socket.id}:`, error);
            }
            
            console.log(`👋 Socket ${socket.id} disconnected and cleaned up`);
        });
    });
}

// Send message to a specific socket ID
function sendMessageToSocketId(socketId, event, data) {
    try {
        console.log(`📤 Attempting to send '${event}' to socket ${socketId}`);
        
        if (!socketId) {
            console.log(`❌ Cannot send message: socketId is null or undefined`);
            return false;
        }
        
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
            socket.emit(event, data);
            console.log(`✅ Message '${event}' sent successfully to socket ${socketId}`);
            return true;
        } else {
            console.log(`❌ Socket ${socketId} not found in connected sockets`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error sending message to socket ${socketId}:`, error);
        return false;
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
