const Transaction = require("../models/transcationModel.js");
const jwt = require("jsonwebtoken");

// Add a transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, type, description, date } = req.body;

    // Verify and decode the JWT token to get the userId
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is defined
    const userId = decoded.id;

    // Ensure required fields are provided
    if (!amount || !type || !description || !date || !userId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Create a new transaction
    const newTransaction = new Transaction({
      amount,
      type,
      description,
      date,
      userId, // Add userId to the transaction
    });

    await newTransaction.save();
    res.status(201).json({ msg: "Transaction added successfully" });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    res.status(500).json({ msg: "An unexpected error occurred" });
  }
};
// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure you're accessing the correct property
    console.log("User ID:", userId); // Verify the ID is correct

    if (!userId) {
      console.log("User ID is missing");
      return res.status(400).json({ msg: "User ID is missing" });
    }

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    console.log("Fetched Transactions:", transactions);
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Get Transactions Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};
