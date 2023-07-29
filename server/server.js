const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt")
const connectToDB = require("./config/connect");
const Cake = require("./models/Cake");
const User = require("./models/User");
const app = express();
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

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


const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;


app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await findUserByIdentifier(identifier);
    if (!user) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const accessToken = jwt.sign({ user: identifier }, jwtSecretKey, { expiresIn: '30s' });
      const refreshToken = jwt.sign({ user: identifier }, refreshSecretKey, { expiresIn: '1d' });

      let users = await findAllUsers();
      //const otherUsers = users.filter((user) => user.username === identifier || user.email === identifier);
      const currentUser = { ...user, refreshToken };
      await updateRefreshTokenInDatabase(currentUser._id, refreshToken);

      // Save the updated users array to the database
      const updatedUsers = await updateUserArray(users);

      if (!updatedUsers) {
        return res.status(500).json({ error: 'Failed to update user data' });
      }

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*100});
      return res.json({ accessToken });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

async function updateRefreshTokenInDatabase(userId, refreshToken) {
    try {
        // Replace 'http://localhost:3000' with the actual URL of your server
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

app.get('/refresh', async (req, res) => {
    try {
        const cookies = req.cookies;
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
});

app.put('/updateRefreshToken/:userId', async (req, res) => {
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
  });


app.get('/getAccountInfo', verifyJWT, async (req, res) => {
    try {
        // req.user contains the username from the decoded JWT
        console.log(req.user);
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
});

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

app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000....");
})