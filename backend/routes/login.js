require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const authgenerator = require("../config/authgenerator");

//Login request
router.post("/", async (req, res) => {
  try {
    let validated = false;
    console.log("login request");
    const token = req.header;
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    console.log("after the find");
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // An error occurred during password comparison
          console.error("Password comparison error:", err);
        } else if (result) {
          // Passwords match
          const payload = {
            user: user
          };
          console.log(payload)
          validated = true;
          const authtoken = authgenerator(payload);
          console.log(user.name)
          return res
            .status(200)
            .json({ validated: validated,authtoken: authtoken,user:user});
        } else {
          // Passwords do not match
          console.log("Passwords do not match");
          return res.status(200).json({ validated: validated, message: "Invalid credentials" });
        }
      });
    } else {
      return res.status(200).json({ validated: validated, message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
