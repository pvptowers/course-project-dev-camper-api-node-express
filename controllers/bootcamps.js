const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @Desc Get All bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
        success: true,
        data: bootcamps
    });
});

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    //req.params.id will get id that is on the url
    const bootcamp = await Bootcamp.findById(req.params.id);

    //handles if id is correctly formatted but does not exist
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id if ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        count: bootcamps.lengh,
        data: bootcamp

    });

});


// @Desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
});

// @Desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id if ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    });

});

// @Desc Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id if ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });

});