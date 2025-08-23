const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to DB');
      console.log("MONGO_URI from env:", process.env.MONGO_URI);

    })
    .catch((err) => {
      console.log('Error connecting to DB:', err);
    });
}

module.exports = connectToDb;
