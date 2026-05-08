const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { fullname, email, password, vehicle } = req.body;

    // Normalize email
    email = email.toLowerCase().trim();

    // Check if captain exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    // set httpOnly cookie for security
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ token, captain });
  } catch (err) {
    console.error('Register Captain Error:', err);

    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!captain) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, captain });
  } catch (err) {
    console.error('Login Captain Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  const captain = req.captain;

  if (!captain) {
    return res.status(404).json({ message: 'Captain not found' });
  }

  res.status(200).json({ captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await blackListTokenModel.create({ token });
  res.clearCookie('token');

  res.status(200).json({ message: 'Logged out successfully' });
};
