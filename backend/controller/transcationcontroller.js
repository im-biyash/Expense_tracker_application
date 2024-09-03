const Transcation = require("../models/transcationmodel"); // Ensure this path is correct

// Get all transactions for a specific user
const getallTranscation = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transcation.find({ userId }); // Use Transcation here
    res.json(transactions);
  } catch (error) {
    console.error("Get User Transactions Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Add a new transaction
const addTranscation = async (req, res) => {
  try {
    const newTranscation = new Transcation(req.body); // Use Transcation here
    await newTranscation.save();
    res.status(201).send({ msg: "Transaction added successfully" });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { getallTranscation, addTranscation };
