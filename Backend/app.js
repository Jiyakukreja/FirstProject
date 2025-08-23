const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors());

const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/captain', captainRoutes);
app.use('/users', userRoutes);

connectToDb();

app.get('/', (req, res) => {
  res.send("Hello World");
});

module.exports = app;
