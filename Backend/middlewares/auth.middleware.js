const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    } 

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // token may contain either `id` or `_id`
        const userId = decoded._id || decoded.id;
        if (!userId) return res.status(401).json({ message: 'Invalid token payload' });

        // don't select password when attaching user to req for general use
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id); // 👈 check id vs _id in token

        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }

        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
