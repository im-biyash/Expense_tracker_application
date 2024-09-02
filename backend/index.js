const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./dbCon');
const userRoutes = require('./routes/user');
const transactionRoute = require('./routes/transcation'); // Updated file name

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoute); // Updated route

// Connect to database
connectToDatabase();

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'Backend started successfully' });
});

// Start server
app.listen(3001, () => {
  console.log('App is listening on port 3001');
});
