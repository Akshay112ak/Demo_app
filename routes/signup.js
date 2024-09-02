var express = require('express');
var router = express.Router();
var { validateEmail,validatePassword } = require('./customvalidators');
const User=require('../model/signup')
const { validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
const cors = require('cors');
/* GET home page. */
router.use(cors());
router.post('/users', async function(req, res, next) {
//console.log(req.body.email,"users",req.body)
  const email=req.body.email;
  const password=req.body.password;
   const username=req.body.username   
    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            console.log("err",existUser)
            return res.status(401).json({ errors: [{ msg: "Email already taken" }] });
        } else {
            const hashpassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashpassword,
                username
            });
            
            await newUser.save();
            return res.status(401).json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.error(error, "Error during user registration");
         res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }

});

module.exports = router;
