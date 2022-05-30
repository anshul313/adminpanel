var mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  Title : {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true,
    trim: true
  },
  tags: [String],
  comments: [String],
  Date: {
    type: Date,
		default: Date.now
  }
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
