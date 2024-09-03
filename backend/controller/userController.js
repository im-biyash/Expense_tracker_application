// controllers/userController.js
c
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ msg: "User created successfully", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(401).json({ msg: error.message });
  }
};




module.exports = {
  loginUser,
  signupUser,
};
