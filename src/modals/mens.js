var mongoose = require("mongoose");

const menSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Age: {
    type: Number,
    default: 30
  }
});

const MensRanking = new mongoose.model("MensRanking", menSchema);
module.exports = MensRanking;
