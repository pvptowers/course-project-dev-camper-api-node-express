const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get reviews
// @route   Get /api/v1/reviews
// @route   Get /api/v1/bootcamps/:bootcampId/reviews
// @access  Pulbic

exports.getReviews = asyncHandler(async (req, res, next) => {
    //Check bootcamp exists
    if (req.params.bootcampId) {
        const reviews = await Review.find({
            bootcamp: req.params.bootcampId
        });
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });


    } else {
        res.status(200).json(res.advancedResults);
    }

});

// @desc    Get single review
// @route   Get /api/v1/reviews/:id
// @access  Pulbic

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'

    });

    if (!review) {
        return next(new ErrorResponse(`No review found with the id of ${req.params.id}`), 404);

    }
    res.status(200).json({
        succes: true,
        data: review
    });
});
// THESE ARE CALLED METHODS
// @desc    Add review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404));
    }

    const review = await Review.create(req.body);



    res.status(201).json({
        succes: true,
        data: review
    });
});


// THESE ARE CALLED METHODS
// @desc    update review
// @route   PUT /api/v1/reviews/:id
// @access  Private

exports.updateReview = asyncHandler(async (req, res, next) => {

    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
    }

    //make sure the review belongs to the user the user is a admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorised toudpate review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });



    res.status(200).json({
        succes: true,
        data: review
    });
});


// THESE ARE CALLED METHODS
// @desc    delete review
// @route   Delete /api/v1/reviews/:id
// @access  Private

exports.deleteReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
    }

    //make sure the review belongs to the user the user is a admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorised toudpate review`, 401));
    }

    await review.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});