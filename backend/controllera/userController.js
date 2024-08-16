
const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.json({ msg: "success" });
    } else {
      res.json({ msg: "failed" });
    }
  });
  router.post("/signup", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.json({ msg: "success" }); 
    } else {
      res.json({ msg: "failed" });
    }
  });