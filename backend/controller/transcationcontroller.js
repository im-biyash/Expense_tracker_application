const Transcation = require("../models/transcationmodel"); // Assuming you have a Transcation model

// Get all transactions
const getallTranscation = async (req, res) => {
  try {
    const allTranscation = await Transcation.find();
    res.send(allTranscation);
  } catch (error) {
    console.error("Get Transactions Error:", error);
    res.status(500).send({ msg: error.message });
  }
};

// Add a new transaction
const addTranscation = async (req, res) => {
  try {
    const newTranscation = new Transcation(req.body);
    await newTranscation.save();
    res.status(201).send({ msg: "Transaction added successfully" });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { getallTranscation, addTranscation };
