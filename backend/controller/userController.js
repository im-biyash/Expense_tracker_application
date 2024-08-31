const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw Error("all fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("invalid email");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
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
    res.json({ msg: "success user created",
      token, password: hashedPassword });
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};
const loginUser = async (req, res) => {
   try{
    const {email,password} = req.body;
    if(!email || !password){
      throw Error("all fields must be filled");
    } 
    const user = await User.findOne({email})
    if(!user){
      throw Error("invalid credentials")
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
      throw Error("invalid credentials")
    } 
    if(match){
      const token = jwt.sign({
        id:user_id,
        username:user.username,
      },process.env.JWT_SECRET,{
        expiresIn:"1h"
      })
      res.json({
        msg:"success",
        token
      })
    }

   }catch(error){
   }

};


module.exports = {
  loginUser,
  signupUser,
};
