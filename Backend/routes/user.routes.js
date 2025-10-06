const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// User Registration Route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').custom(value => {
        if (!value || !value.firstname || value.firstname.length < 3) {
            throw new Error('First Name must be at least 3 characters long');
        }
        if (!value.lastname || value.lastname.length < 1) {
            throw new Error('Last Name is required');
        }
        return true;
    }),
    body('password').custom(value => {
        if (value.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!/\d/.test(value)) {
            throw new Error('Password must contain at least one number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            throw new Error('Password must contain at least one special character');
        }
        return true;
    })
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
    body('password').custom(value => {
        if (value.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!/\d/.test(value)) {
            throw new Error('Password must contain at least one number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            throw new Error('Password must contain at least one special character');
        }
        return true;
    })
], userController.loginUser);

// Profile and Logout Routes
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
