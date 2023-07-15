const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt")
const connectToDB = require("./config/connect");
const Cake = require("./models/Cake");
const User = require("./models/User");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

connectToDB();

app.get('/getCakes', async (req, res) => {
    const Cakes = await Cake.find();
    res.json({ Cakes })
})

app.get('/getCakes/:cakeID', async (req, res) => {
    const cakeID = req.params.cakeID;
    const cake = await Cake.findById(cakeID);
    res.json({ cake });
})

app.post('/addCake', async (req, res) => {
    const { title, description, price, ingredients, picture } = req.body;
    const cake = await Cake.create({
        title,
        description,
        price,
        ingredients,
        picture
    });
    res.json({ cake });
})

app.get('/getCakesBySubstring/:substring', async (req, res) => {
    const encodedSubstring = encodeURIComponent(req.params.substring);
    const newSubstring = encodedSubstring.replace(/%20/g, ' ');
    const regex = new RegExp(newSubstring, 'i');

    const Cakes = await Cake.find({ title: regex });
    res.json({ Cakes });
});

app.post('/signup', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        const existingUser = await User.findOne({ email }) || await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password,
            registrationDate: new Date(),
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
});

app.get('/login', async (req, res) => {
    const Users = await User.find();
    res.json({ Users })
  });

app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000....");
})