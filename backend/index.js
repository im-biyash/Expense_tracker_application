const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./dbCon');
const userRoutes = require('./routes/user');
// const transactionRoute = require('./routes/transcation'); // Updated file name
const transactionRoutes = require('./routes/transcation')
const app = express();
const bodyParser = require("body-parser")
const  port = process.env.PORT || 3001
// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use routes
app.use('/api/user', userRoutes);

app.use('/api/transaction', transactionRoutes);

// Connect to database
connectToDatabase();

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'Backend started successfully' });
});

// Start server
app.listen(port, () => {
  console.log('App is listening on port 3001');
});
