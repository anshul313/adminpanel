var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    default: 30
  },
  Password: {
    type: String,
    required: true,
    trim: true
  },
  Token: {
    type: String,
    required: true,
    trim: true
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
