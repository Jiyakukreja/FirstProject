const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // expires in 1 hour
    }
});

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);
