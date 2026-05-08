const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { fullname, email, password, vehicle } = req.body;

    // Extra safety check
    if (!fullname?.firstname || !fullname?.lastname) {
      return res.status(400).json({ message: 'First and last name are required' });
    }

    // Normalize email
    email = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password: hashedPassword,
      vehicle
    });

    // Generate token
    const token = user.generateAuthToken();

    // remove password before sending response
    if (user && user.password) user.password = undefined;

    res.status(201).json({ token, user });
  } catch (err) {
    console.error('Register Error:', err);

    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    if (user && user.password) user.password = undefined;

    res.status(200).json({ token, user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (token) {
      await blackListTokenModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
