const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:5173",                  // local frontend
    "https://h9q017nc-5173.inc1.devtunnels.ms" // forwarded dev tunnel
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DB connect
const connectToDb = require('./db/db');
connectToDb();

// ✅ Routes import
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

// ✅ Routes use
app.use('/captain', captainRoutes);
app.use('/users', userRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send("Hello World");
});

module.exports = app;
