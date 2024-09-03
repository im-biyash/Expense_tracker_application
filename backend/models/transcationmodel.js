
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Ensure this is required if necessary
    ref: 'User', // Reference to User model if needed
  },
});
module.exports = mongoose.model('Transcation', transactionSchema)