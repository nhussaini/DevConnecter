const express = require('express');
//The express.Router() function is used to create a new router object. 
//This function is used when you want to create a new router object in your program to handle requests.
const router = express.Router();

// @route    GET api/users
// @desc     Test route
// @access   Public

router.get('/', (req,res) => res.send('User Route'));

module.exports = router;