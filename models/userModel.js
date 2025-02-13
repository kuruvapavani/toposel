const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Basic email validation
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    country: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified

    try {
        // Hash the password with a salt of 10 rounds
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords (useful for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error('Error comparing password');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
