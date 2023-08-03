const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

async function findAllUsers() {
    try {
      const users = await User.find();
      if (users !== null) {
        const updatedUsers = users.map((user) => user.toObject());
        return updatedUsers;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error: ', error);
      return null;
    }
  }

const refreshAccessToken = async (req, res) => {
    try {
      const cookies = req.cookies;
      //console.log("cookies: ", cookies.jwt);
      if (!cookies?.jwt) {
        return res.status(401).json({ error: 'Refresh token not found' });
      }
  
      const refreshToken = cookies.jwt;
      const users = await findAllUsers();
  
      if (!users || users.length === 0) {
        return res.status(500).json({ error: 'User data not found' });
      }
  
      const foundUser = users.find((user) => user.refreshToken.toString() == refreshToken);
  
  
  
      if (!foundUser) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
  
  
      jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
        if (err || foundUser.username !== decoded.user) {
          return res.status(403).json({ error: 'Invalid refresh token or user mismatch' });
        }
  
        // Generate a new access token
  
        const accessToken = jwt.sign({ user: foundUser.username }, jwtSecretKey, { expiresIn: '30s' });
  
        // Respond with the new access token
        res.json({ accessToken });
      });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const updateRefreshToken = async (req, res) => {
    const userId = req.params.userId;
    const { refreshToken } = req.body;
  
    try {
      // Update the user in the database with the new refresh token
      const updatedUser = await User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with a success message or appropriate response
      return res.json({ message: 'Refresh token updated successfully' });
    } catch (error) {
      console.error('Error updating refreshToken in the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    refreshAccessToken,
    updateRefreshToken
  };