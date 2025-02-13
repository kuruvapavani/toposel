const express = require('express');
const router = express.Router();
const { registerUser, loginUser, searchUser } = require('../controllers/userController'); // Import controller functions

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Search a user by username
router.get('/search', searchUser);

module.exports = router;
