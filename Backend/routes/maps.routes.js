const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { getCoordinates } = require('../controllers/map.controller'); // ✅ import properly
const { query } = require('express-validator');
const { map } = require('../app');
const mapController = require('../controllers/map.controller'); // ✅ import properly

router.get(
  '/get-coordinates',
  (req, res, next) => {
    console.log('Incoming GET /maps/get-coordinates', req.query);
    next();
  },
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  getCoordinates
);

router.get('/get-distance-time',
  query('origin').isString().isLength({ min: 3 }),
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceAndTime
); 

router.get('/get-suggestions',
  query('input').isString().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);


module.exports = router;
