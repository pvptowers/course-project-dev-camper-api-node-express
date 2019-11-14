const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
// To use environment variables we need to load the config.env file from the config folder
dotenv.config({
    path: './config/config.env'
});


//connect to database
connectDB();


// Route files

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// initialise app variable with express
const app = express();

// Body Parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware that we only want to run in the dev env

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// File uploading

app.use(fileupload());

//Sanitize data

app.use(mongoSanitize());

// Helment

app.use(helmet());

// prevent cross site scrupting attacks

app.use(xss());

// rate limiting

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
});

app.use(limiter);

// hpp - precent http param pollution

app.use(hpp());
//enable CORS
app.use(cors());


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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