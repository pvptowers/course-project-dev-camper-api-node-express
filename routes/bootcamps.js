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

//initialise router
const router = express.Router();

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