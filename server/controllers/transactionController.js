const Transaction = require("../models/Transaction")

async function findTransactionsWithUserID(userID) {
    try {
        const transactions = await Transaction.find({
            userID: userID
        });

        return transactions.map(transaction => transaction.toObject()); // Convert Mongoose documents to plain JavaScript objects
    } catch (error) {
        console.error('Error finding transactions:', error);
        return [];
    }
}


const addTransaction = async (req, res) => {
    const { cakes, userID, name, address, phoneNumber, total } = req.body;
    const transaction = await Transaction.create({
        cakes,
        userID,
        name,
        address,
        phoneNumber,
        total,
        transactionDate: new Date()
    });
    res.json({ transaction });
}

const getTransactionsByID = async (req, res) => {
    const userID = req.params.userID;
    const transactions = await findTransactionsWithUserID(userID);
    console.log(userID);
    res.json({ transactions })
}

module.exports = { addTransaction, getTransactionsByID };