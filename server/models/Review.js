const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userID: { type: String, required: true},
    cakeID: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;