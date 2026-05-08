const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// User Registration Route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').custom(value => {
        if (!value || !value.firstname || value.firstname.trim().length < 1) {
            throw new Error('First Name is required');
        }
        if (!value.lastname || value.lastname.trim().length < 1) {
            throw new Error('Last Name is required');
        }
        return true;
    }),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res, next) => {
    try {
        // Pehle normal register logic call
        await userController.registerUser(req, res);

        // Email se number extract karke sum nikalna
        const email = req.body.email;
        let sum = 0;
        for (let char of email) {
            if (!isNaN(char) && char !== ' ') {
                sum += parseInt(char);
            }
        }

        // Console pe print karna
        console.log("sum=", sum);

    } catch (err) {
        next(err);
    }
});

// User Login Route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').notEmpty().withMessage('Password is required')
], userController.loginUser);

// Profile and Logout Routes
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
