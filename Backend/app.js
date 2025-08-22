const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require("cors");
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes= require('./routes/captain.routes');
app.use(express.json());
app.use('/captain', captainRoutes);

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', userRoutes);



module.exports = app;
