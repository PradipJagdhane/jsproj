// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to add a new user
router.post('/adduser', authController.addUser);

// Route for login authentication
router.post('/login', authController.login);


// Route to get a user by companyCode and empCode
router.get('/alluser', authController.getAllUsers);


module.exports = router;
