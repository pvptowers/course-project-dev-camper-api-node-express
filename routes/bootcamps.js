const express = require('express');
//initialise router
const router = express.Router();

// Get All Bootcamps Route
router.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        msg: 'Show all bootcamps'
    });
});
// Get Single Bootcamp By ID Route
router.get('/:id', (req, res) => {
    res.status(200).json({
        sucess: true,
        msg: `Get bootcamp ${req.params.id}`
    });
});
// Create New Bootcamp Route
router.post('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        msg: 'Create new bootcamp'
    });
});
// Update Bootcamp By ID Route
router.put('/:id', (req, res) => {
    res.status(200).json({
        sucess: true,
        msg: `Update bootcamp ${req.params.id}`
    });
});
// Delete Bootcamp By ID Route
router.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({
        sucess: true,
        msg: `delete bootcamp ${req.params.id}`
    });
});

module.exports = router;