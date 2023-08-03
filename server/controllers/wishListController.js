const User = require("../models/User");

const updateWishList = async (req, res) => {
    const userId = req.params.identifier;
    const wishList = req.body;
    try {
      // Update the user in the database with the new refresh token
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { wishList } }, 
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ message: 'wish list updated successfully' });
    } catch (error) {
      console.error('Error updating wish list in the database: ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { updateWishList };