/* const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const authgenerator = require("../config/authgenerator");

//Signup request
router.post(
  "/",
  [
    body("email", "enter a valid email").isEmail(),
    body("username", "enter a valid name").isLength({ min: 3 }),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let validated = false;
    console.log("register initiated");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors were there");
      return res.send({ validated: validated, error: errors.array() });
    }

    try {
      const { email, username, password } = req.body;
      console.log(email, password, username);
      const secPass = await bcrypt.hashSync(password, salt);
      const user = await User.create({
        email: email,
        name: username,
        password: secPass,
      });

      const payload = {
        user : user,
      };
      
      validated = true;
      const authtoken = authgenerator(payload);

      res.status(200).json({ validated: validated, authtoken: authtoken });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        // Duplicate key error for email field
        return res
          .status(400)
          .json({
            validated: validated,
            message: "Email address is already in use",
          });
      } else {
        // Other errors
        console.error(error);
        return res
          .status(500)
          .json({ validated: validated, message: "Internal server error" });
      }
    }
  }
);

module.exports = router;
 */
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const authgenerator = require("../config/authgenerator");

// Signup request
router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("username", "Username must be at least 3 characters long").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let validated = false;
    console.log("Register initiated");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors found");
      return res.status(400).json({ validated: validated, error: errors.array() });
    }

    try {
      const { email, username, password } = req.body;
      console.log(email, password, username);
      const secPass = await bcrypt.hash(password, 10);  // Using async version
      const user = await User.create({
        email: email,
        name: username,
        password: secPass,
      });

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };

      validated = true;
      const authtoken = authgenerator(payload);

      res.status(200).json({ validated: validated, authtoken: authtoken });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        // Duplicate key error for email field
        return res.status(400).json({
          validated: validated,
          message: "Email address is already in use",
        });
      } else {
        // Other errors
        console.error(error);
        return res.status(500).json({ validated: validated, message: "Internal server error" });
      }
    }
  }
);

module.exports = router;
