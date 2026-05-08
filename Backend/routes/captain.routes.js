const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('password')
        .matches(passwordPattern)
        .withMessage('Password must be at least 8 characters long and include a number and a special character'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
        .matches(passwordPattern)
        .withMessage('Password must be at least 8 characters long and include a number and a special character')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
