const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./config/connect");
const app = express();
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cakeController = require("./controllers/cakeController");
const refreshTokenController = require("./controllers/refreshTokenController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const wishListController = require("./controllers/wishListController")
const transactionController = require("./controllers/transactionController");

dotenv.config();

app.use(credentials)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectToDB();

app.get('/getCakes', cakeController.getCakes)

app.get('/getCakes/:cakeID', cakeController.getCake)

app.post('/addCake', cakeController.addCake)

app.get('/getCakesBySubstring/:substring', cakeController.orderedCakes);

app.post('/signup', authController.signup);

app.post('/login', authController.login);

app.get('/refresh', refreshTokenController.refreshAccessToken);

app.put('/updateRefreshToken/:userId', refreshTokenController.updateRefreshToken);

app.get('/logout', authController.logout)

app.get('/getAccountInfo', verifyJWT, authController.getAccountInfo);

app.put('/updatecart/:identifier', cartController.updateCart);

app.put('/updatewishlist/:identifier', wishListController.updateWishList);

app.post('/addtransaction', transactionController.addTransaction);

app.get('/gettransactionbyid/:userID', transactionController.getTransactionsByID);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000....");
})