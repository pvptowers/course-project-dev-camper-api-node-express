const express = require('express');
const dotenv = require('dotenv');

// To use environment variables we need to load the config.env file from the config folder
dotenv.config({
    path: './config/config.env'
});

// initialise app variable with express
const app = express();
// Create variable for port which you access using process.env
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));