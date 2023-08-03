const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

async function updateRefreshTokenInDatabase(userId, refreshToken) {
    try {
      const response = await fetch(`http://localhost:3000/updateRefreshToken/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating refreshToken in the database:', error);
      throw error;
    }
  }

async function updateUserArray(users) {
    try {
      const result = await User.updateOne({}, { users: users });
      return result;
    } catch (error) {
      console.error('Error updating users array:', error);
      return null;
    }
  }

  async function findUserByIdentifier(identifier) {
    try {
      // Replace this with your actual database query to find the user based on email or username
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
  
      return user ? user.toObject() : null; // Convert Mongoose document to a plain JavaScript object
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

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

const signup = async (req, res) => {
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
  }

const login = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {
      const user = await findUserByIdentifier(identifier);
      if (!user) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const accessToken = jwt.sign({ user: identifier }, jwtSecretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user: identifier }, refreshSecretKey, { expiresIn: '1d' });
  
        let users = await findAllUsers();
        //const otherUsers = users.filter((user) => user.username === identifier || user.email === identifier);
        const currentUser = { ...user, refreshToken };
        await updateRefreshTokenInDatabase(currentUser._id, refreshToken);
        //console.log(currentUser);
        // Save the updated users array to the database
        const updatedUsers = await updateUserArray(users);
  
        if (!updatedUsers) {
          return res.status(500).json({ error: 'Failed to update user data' });
        }
  
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 100 });
  
        return res.json({ currentUser: currentUser._id, accessToken });
      } else {
        return res.status(401).json({ error: 'Incorrect password' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  const logout = async (req, res) => {
    //delete access toke nin frontend
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
  
    const users = await findAllUsers();
    const foundUser = users.find((user) => user.refreshToken.toString() == refreshToken);
  
  
  
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 100 })
      return res.sendStatus(204);
    }
  
    await updateRefreshTokenInDatabase(foundUser._id, "");
  
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 100 });
    res.sendStatus(204);
  }

  const getAccountInfo = async (req, res) => {
    try {
      // req.user contains the username from the decoded JWT
      const { user } = req;
      const accountInfo = await findUserByIdentifier(user);
      if (!accountInfo) {
        return res.status(404).json({ error: 'User account not found' });
      }
  
      // Respond with the user's account information
      res.json({ accountInfo });
    } catch (error) {
      console.error('Error fetching account info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    signup,
    login,
    logout,
    getAccountInfo
  }