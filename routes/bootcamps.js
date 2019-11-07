const express = require('express');
//Bring in methods from controllers/bootcamps.js
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps');

//Include other resource routers
const courseRouter = require('./courses');



//initialise router
const router = express.Router();

// Re-route into other resource routers
//this passes it onto the course router if the url /:bootcampID/courses is hit
router.use('/:bootcampId/courses', courseRouter);


router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//takes url from server.js where url was mounted
router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);


module.exports = router;