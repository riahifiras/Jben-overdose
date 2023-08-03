const Cake = require("../models/Cake");

const getCakes = async (req, res) => {
    const Cakes = await Cake.find();
    res.json({ Cakes })
}

const getCake = async (req, res) => {
    const cakeID = req.params.cakeID;
    const cake = await Cake.findById(cakeID);
    res.json({ cake });
}

const addCake = async (req, res) => {
    const { title, description, price, ingredients, picture } = req.body;
    const cake = await Cake.create({
        title,
        description,
        price,
        ingredients,
        picture
    });
    res.json({ cake });
}

const orderedCakes = async (req, res) => {
    const encodedSubstring = encodeURIComponent(req.params.substring);
    const newSubstring = encodedSubstring.replace(/%20/g, ' ');
    const regex = new RegExp(newSubstring, 'i');

    const Cakes = await Cake.find({ title: regex });
    res.json({ Cakes });
}

module.exports = {
    getCakes,
    getCake,
    addCake,
    orderedCakes
};