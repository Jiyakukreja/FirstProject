const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // 1️⃣ Create ride
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        // Populate user information
        await ride.populate('user', 'fullname phone email');

        const pickupCoords = await mapService.getAddressCoordinate(pickup);
        console.log(" Pickup coordinates:", pickupCoords);


        const captainsInTheRadius = await mapService.getCaptainsInTheRadius(
            Number(pickupCoords.latitude),
            Number(pickupCoords.longitude),
            2 
        );

        console.log(`📍 Found ${captainsInTheRadius.length} captains in radius`);
        captainsInTheRadius.forEach((captain, index) => {
            console.log(`Captain ${index + 1}:`, {
                id: captain._id,
                name: captain.fullname,
                socketId: captain.socketId,
                status: captain.status
            });
        });

        // Prepare ride data for captain notification (OTP included for captain to verify at pickup)
        const rideForCaptain = {
            _id: ride._id,
            pickup: ride.pickup,
            destination: ride.destination,
            fare: ride.fare,
            distance: ride.distance,
            duration: ride.duration,
            user: ride.user,
            otp: ride.otp,  // Captain needs OTP to verify at pickup
            status: ride.status,
            vehicleType: ride.vehicleType
        };
        
        console.log(`📤 Sending ride request to ${captainsInTheRadius.length} captains with OTP: ${ride.otp}`);
        
        let notificationsSent = 0;
        captainsInTheRadius.forEach((captain) => {
          if (captain.socketId) {
            const sent = sendMessageToSocketId(
              captain.socketId,       
              "rideRequest",         
              rideForCaptain                    
            );
            if (sent) notificationsSent++;
          } else {
            console.log(`⚠️ Captain ${captain._id} has no socketId`);
          }
        });

        console.log(`✅ Ride notifications sent to ${notificationsSent}/${captainsInTheRadius.length} captains`);

        // Return ride with OTP to user (user needs to share OTP with captain at pickup)
        return res.status(201).json({ ride, pickupCoords, captainsInTheRadius });

    } catch (error) {
        console.error("❌ Create ride error:", error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}