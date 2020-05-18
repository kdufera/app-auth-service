'use strict';

const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect("https://www.mlab.com/databases/heroku_5077c36g/userAuth",{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

var db = mongoose.connection;
db.once("open", function(callback) {
console.log("Connected to mongodB..." )
});

module.exports = { mongoose };
