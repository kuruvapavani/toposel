const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password, fullName, gender, dateOfBirth, country } = req.body;

    try {
        // Convert the dateOfBirth string into a Date object (assuming DD/MM/YYYY format)
        const parsedDateOfBirth = new Date(dateOfBirth.split('/').reverse().join('-'));

        // Check if the parsed date is invalid
        if (isNaN(parsedDateOfBirth)) {
            return res.status(400).json({ message: 'Invalid date format. Use DD/MM/YYYY.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists.' });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
            fullName,
            gender,
            dateOfBirth: parsedDateOfBirth,
            country
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};


// Login User
const loginUser = async (req, res) => { 
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check the password using the comparePassword method (assuming bcrypt is used for password hashing)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token with userId
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


const searchUser = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'Username query parameter is required.' });
    }

    try {
        // Use a case-insensitive search by adding the 'i' flag to the regex
        const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }).select('-password'); // Excluding the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error searching user', error: err.message });
    }
};


module.exports = { registerUser, loginUser, searchUser };
