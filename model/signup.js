const mongoose = require('mongoose');

const usersignupSchema = new mongoose.Schema({
  email: {
    type:String,
  },
  password: {
    type:String,
  },
  username:{
    type:String,
  },
});

const User = mongoose.model('usersignup', usersignupSchema);

module.exports = User;
