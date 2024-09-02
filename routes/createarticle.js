var express = require('express');
var router = express.Router();
const {verifyToken} = require('./customvalidators');
const Article=require('../model/createarticle')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const cors = require('cors');
/* GET home page. */
router.use(cors());
router.post('/articles',verifyToken, async function(req, res, next) {
    var userid;
    const token = req.headers.authorization;
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
      userid=decoded.userId});
    const { articletitle, about,articlesummary,tags } = req.body;
    const newarticle = new Article({
        articletitle,
        about,
        articlesummary,
        tags,
        userid
    });
    newarticle.save().then(()=>
    {
        res.status(200).json({ message: "User registered successfully" })
    }).catch((error)=>
        {
            console.error(error, "Error during user registration");
            res.status(500).json({ errors: [{ msg: "Internal server error" }] });
        })
});
router.get('/users/getyourfeed/:id',verifyToken,function(req,res)
{
   var id=req.params.id
   console.log("em",id)
    Article.find({userid:id})
      .then(result => {
        // console.log("res",result.docs)
        console.log(result)
       res.json({your:result})
      })
        .catch((err) =>
        {
          console.log("error back in view",err)
        });
});    
router.get('/users/globalfeed',verifyToken,function(req,res)
{
 
    Article.find()
      .then(result => {
        // console.log("res",result.docs)
        console.log(result)
       res.json({global:result})
      })
        .catch((err) =>
        {
          console.log("error back in view",err)
        });
});    
router.get('/globalfeed',function(req,res)
{
 
    Article.find()
      .then(result => {
        // console.log("res",result.docs)
        console.log(result)
       res.json({global:result})
      })
        .catch((err) =>
        {
          console.log("error back in view",err)
        });
});    
module.exports = router;
