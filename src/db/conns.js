
// var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';
mongoose.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
  });