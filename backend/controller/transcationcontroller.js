const Transaction = require("../models/transcationmodel"); // Corrected model import

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { userId } = req.query; 
    if (!userId) {
      return res.status(400).send({ msg: 'User ID is required' });
    }
    const transactions = await Transaction.find({ userId });
    res.send(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).send({ msg: error.message });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
      const { amount, type, description, date, userId } = req.body;
  
      if (!userId) {
        return res.status(400).send({ msg: 'User ID is required' });
      }
  
      const newTransaction = new Transaction({
        amount,
        type,
        description,
        date,
        userId
      });
  
      await newTransaction.save();
      res.status(201).send({ msg: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
      console.error("Add Transaction Error:", error);
      res.status(500).send({ msg: error.message });
    }
  };

module.exports = { getAllTransactions, addTransaction };
