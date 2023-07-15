const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date },
    phoneNumber: Number,
    address: String,
    profilePic: String,
    shoppingCart: [String],
    wishList: [String],
    previousTransactions: [String]
})

const User = mongoose.model('User', userSchema);

module.exports = User;