const express = require('express');
//Bring in methods from controllers/courses.js
const {
    getCourses
} = require('../controllers/courses');

const router = express.Router();

router.route('/').get(getCourses);

module.exports = router;