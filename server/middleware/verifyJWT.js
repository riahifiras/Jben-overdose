const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) return res.sendStatus(403); // invalid token
        req.user = decoded.user; // Set the req.user property with the username from the decoded JWT
        next();
    });
};

module.exports = verifyJWT;

