require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Connect to the database
connectDB(process.env.MONGODB_URI);

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is successfully running, and app is listening on port ${port}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
