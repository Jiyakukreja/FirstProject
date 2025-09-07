const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const { address } = req.query; 
    console.log("[Controller] Query address:", address);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("[Controller] Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        if (!coordinates) {
            console.log("[Controller] No coordinates found for:", address);
            return res.status(404).json({ message: 'Coordinates not found' });
        }
        console.log("[Controller] Coordinates found:", coordinates);
        res.status(200).json({ coordinates });
    } catch (error) {
        console.error("[Controller] Error:", error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports.getDistanceAndTime = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

        const distanceTime = await mapsService.getDistanceAndTime(origin, destination);
        res.status(200).json(distanceTime);

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {


    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;

        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}

