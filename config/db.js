const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = async (dbUri) => {
  if (!dbUri) {
    console.error("MongoDB URI is undefined. Check your .env file.");
    process.exit(1); // Exit the process if the URI is not set
  }

  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(dbUri);

    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
