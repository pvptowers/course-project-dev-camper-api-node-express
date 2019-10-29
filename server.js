const express = require('express');
const dotenv = require('dotenv');

// Route files

const bootcamps = require('./routes/bootcamps');

// To use environment variables we need to load the config.env file from the config folder
dotenv.config({
    path: './config/config.env'
});

// initialise app variable with express
const app = express();

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


// Create variable for port which you access using process.env
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));