
var express = require('express');
var router = express.Router();
const User=require('../model/signup')
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

router.post('/users/login', async function(req, res, next) {
    const email = req.body.email; // Use req.body to retrieve data from the request
    const password = req.body.password;
     var userid;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(401).json({ errors: [{ msg: "Incorrect Username" }] });
        }

        bcrypt.compare(password, user.password)
            .then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(401).json({ errors: [{ msg: "Incorrect password" }] });
                }
                
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET = generateSecretKey(),
                    { expiresIn: '1h' }
                );
                userid=user._id
                var data = {userid, token };
                console.log(token,typeof(token))
                return res.status(200).json(data);
            })
            .catch(error => {
                console.error(error, "Error during user login");
                return res.status(500).json({ errors: [{ msg: "Internal server error" }] });
            });
    });
});

  module.exports = router;