// @Desc Get All bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        msg: 'Show all bootcamps'
    });
}

// @Desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        msg: `Get bootcamp ${req.params.id}`
    });
}

// @Desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        msg: 'Create new bootcamp'
    });
}

// @Desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        msg: `Update bootcamp ${req.params.id}`
    });
}

// @Desc Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        msg: `delete bootcamp ${req.params.id}`
    });
}