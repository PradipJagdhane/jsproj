// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/mydatabase';
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
