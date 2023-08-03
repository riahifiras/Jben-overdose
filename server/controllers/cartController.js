const User = require("../models/User");

const updateCart = async (req, res) => {
    const userId = req.params.identifier;
    const shoppingCart = req.body;
    try {
        // Update the user in the database with the new refresh token
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { shoppingCart } }, // Use $set to update the shoppingCart field
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with a success message or appropriate response
        return res.json({ message: 'Shopping cart updated successfully' });
    } catch (error) {
        console.error('Error updating shopping cart in the database: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { updateCart };