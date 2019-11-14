const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "please add a title for the review"],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});
// limits user to 1 review per bootcamo
ReviewSchema.index({
    bootcamp: 1,
    user: 1
}, {
    unique: true
});



//define static method to get avg of rating and save

ReviewSchema.statics.getAverageRating = async function (bootcampId) {
    const obj = await this.aggregate([{
            $match: {
                bootcamp: bootcampId
            }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: {
                    $avg: '$rating'
                }
            }
        }
    ]);
    //place result into db
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        });
    } catch (error) {
        console.error(error);
    }
};

// Call getAverageCost after save

ReviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageCost before remove
ReviewSchema.pre('save', function () {
    this.constructor.getAverageRating(this.bootcamp);

});

module.exports = mongoose.model('Review', ReviewSchema);