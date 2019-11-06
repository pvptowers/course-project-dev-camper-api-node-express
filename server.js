const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// To use environment variables we need to load the config.env file from the config folder
dotenv.config({
    path: './config/config.env'
});


//connect to database
connectDB();


// Route files

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// initialise app variable with express
const app = express();

// Body Parser
app.use(express.json());

//Dev logging middleware that we only want to run in the dev env

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

// Create variable for port which you access using process.env
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //close server & exit process
    server.close(() => process.exit(1));
});