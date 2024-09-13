const express = require("express");

const router = express.Router();

const { loginUser, signupUser,getAllUsers } = require("../controllers/userController");
router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/all", getAllUsers);

module.exports = router;
