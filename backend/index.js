
const express = require("express");

const app = express();
const connectToDatabase = require("./dbCon");
const userRoutes = require("./routes/user")
app.use(express.json());

app.use('/api/user',userRoutes)

connectToDatabase();

app.get('/', (req,res) => {
   res.json({ msg:"backend started successfully"})
})
app.listen(3001, () =>{
    console.log("app is lestening to the port");
})