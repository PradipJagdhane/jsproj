// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const saltRounds = 10;

exports.addUser = async (req, res) => {
    const { companyCode, empCode, password } = req.body;

    if (!companyCode || !empCode || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ companyCode, empCode, passwordHash });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User added successfully' });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { companyCode, empCode, password } = req.body;

    try {
        const user = await User.findOne({ companyCode, empCode }).exec();

        if (user) {
            const isMatch = await bcrypt.compare(password, user.passwordHash);

            if (isMatch) {
                const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
                res.json({ success: true, token });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




// Existing imports and other code...

// Update the function to retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.find().exec();

        // Exclude the passwordHash from each user's data
        const usersData = users.map(({ passwordHash, ...userData }) => userData);

        res.json({ success: true, users: usersData });
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


