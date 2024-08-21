// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    companyCode: String,
    empCode: String,
    passwordHash: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
