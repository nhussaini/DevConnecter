const express = require("express");
//The express.Router() function is used to create a new router object.
//This function is used when you want to create a new router object in your program to handle requests.
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
  }
);
// router.post("/", (req, res) => {
//   console.log("reached user route");
//   res.send("user route");
// });

module.exports = router;
