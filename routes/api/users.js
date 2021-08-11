const express = require("express");
//The express.Router() function is used to create a new router object.
//This function is used when you want to create a new router object in your program to handle requests.
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register User
// @access   Public

// router.get('/', (req,res) => {
//   res.send('User Route')
// });

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email: email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //create a new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    //encrypt password
    //return jsonwebtoken
    console.log(req.body);
  }
);
// router.post("/", (req, res) => {
//   console.log("reached user route");
//   res.send("user route");
// });

module.exports = router;
