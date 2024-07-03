const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  let validation = false;
  console.log("protected initiated");
  try {
    
    const { email, password } = req.user;
    console.log('email:',email,'this is password', password)
    const user = await User.findOne({ email });
    console.log(req.user)
    if (user) {
      /* await bcrypt.compare(password, user.password, (error, result) => {
        console.log('result is' ,result)
        if (error) console.log("password match error : ", error);
        else if (!result) {
          console.log('user in protected',user)
          validation = true
          console.log('name of the user ',user.name)
          res.status(200).json({validation:validation,user:user});
        }
      }); */
      console.log('user in protected',user)
          validation = true
          console.log('name of the user ',user.name)
          res.status(200).json({validation:validation,user:user});

    }
    else {
      console.log('not authenticated')
      res.status(200).json({validation:false,user:user});
    }
  } catch (error) {
    console.log(error)
  }
  
});
 
module.exports = router;

/* const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  console.log("protected initiated");
  try {
    const { email, password } = req.user;
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
        console.log('user in protected', user);
        console.log('name of the user', user.name);
        return res.send({ validation: true, user:user });
      } else {
        console.log('Password does not match');
        return res.send({ validation: false,user:user });
      }
    } else {
      console.log('User not found');
      return res.status(401).send({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
 */