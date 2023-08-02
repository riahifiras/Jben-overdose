const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
    title: { type:String, required: true},
    description: { type:String, required: true},
    price: { type:Number, required: true},
    ingredients: { type:[String], required: true},
    picture: { type:String, required: true},
    ingredients: { type:[String], required: true},
    rating: { type:Number, required: true}
})

const Cake = mongoose.model('Cake', cakeSchema);

module.exports = Cake;