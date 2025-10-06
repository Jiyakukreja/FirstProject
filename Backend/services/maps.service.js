const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key not set in environment");
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: apiKey
      }
    });

    // ✅ Ab yahan log kar
    console.log("Google API response:", response.data);

    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("No results found for this address. Try using full address with city and country.");
    }

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("Coordinates not found");
    }

    const location = response.data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng
    };
  } catch (error) {
    throw new Error(`Failed to fetch coordinates: ${error.message}`);
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
  if(response.data.status === 'OK') {

    if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
      throw new Error('No routes found');
    }

    return response.data.rows[0].elements[0];
  }
  else{
    throw new Error('Error fetching distance and time');
  }
}
  catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions;
    } else {
      throw new Error('Error fetching suggestions: ' + response.data.status);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  //radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng ], radius / 6378] // Earth's radius in km
      }
    }
  });
  return captains;
}
