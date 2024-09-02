const mongoose = require('mongoose');

const usersarticleSchema = new mongoose.Schema({
    articletitle: {
    type:String,
  },
  about: {
    type:String,
  },
  articlesummary:{
    type:String,
  },
  tags:{
    type:Array,
  },
  userid:{
    type:String
  }
});

const User = mongoose.model('usersarticle', usersarticleSchema);

module.exports = User;
