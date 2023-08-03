const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    cakes: [{
        id: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    userID: { type: String, required: true },
    total: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;