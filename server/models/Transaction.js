const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    cakeID: { type: String, required: true },
    userID: { type: String, required: true },
    transactionDate: { type: Date, required: true }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;