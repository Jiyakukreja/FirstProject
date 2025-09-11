const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
   
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }

    const distanceTime = await mapService.getDistanceAndTime(pickup, destination); // in kilometers
    
    const baseFare={
        auto:30,
        car:50,
        moto:20
    };

    const perKmRate={
        auto:10,
        car:15,
        moto:8
    };

    const perMinRate={
        auto:2,
        car:3,
        moto:1
    };

    const fare = {
    auto: parseFloat(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinRate.auto)).toFixed(2),
    car: parseFloat(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinRate.car)).toFixed(2),
    moto: parseFloat(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinRate.moto)).toFixed(2)
};


    return fare;
}

module.exports.getFare=getFare;

function getOtp(num)
{
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required to create a ride');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel({
        user,
        pickup,
        destination,
        otp:getOtp(4),
        fare: fare[vehicleType],
    });
    return ride;
};

