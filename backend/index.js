const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./dbCon");
const userRoutes = require("./routes/user");

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use('/api/user', userRoutes);

connectToDatabase();

app.get('/', (req, res) => {
  res.json({ msg: "Backend started successfully" });
});

app.listen(3001, () => {
  console.log("App is listening on port 3001");
});
