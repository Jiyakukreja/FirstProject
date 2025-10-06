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

        ride.otp = ""
        
        captainsInTheRadius.forEach((captain) => {
          if (captain.socketId) {
            sendMessageToSocketId(
              captain.socketId,       
              "rideRequest",         
              ride                    
            );
          }
        });


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