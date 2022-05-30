const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require('../modals/user');
const Post = require('../modals/Post');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;


router.post("/getpost", (req, res) => {
  Post.find().sort({"Date": -1})
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to find to database");
    });
});

router.post("/signup", (req, res) => {
  var myData = new User(req.body);
  const token = jwt.sign({ Password: req.body.Password }, 'anshul1212313');
  myData.Token = token;

  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  res.send({ data: null, error: false, status: 200, token: token });
  res.end();
});

router.post("/login", (req, res) => {
  User.find({ Email: req.body.Email, Password: req.body.Password })
    .then(item => {
      console.log("user login apit hit");
      res.send({ data: item, error: false, staus: 200 });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = file.originalname + Date.now();
    fileName = uniqueName;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

router.post("/Post", upload.single("uploaded_file"), (req, res) => {
  var myData = new Post(req.body);
  myData.imageUrl = req.body.imageUrl;
  myData.userId = req.body.userId.toString();
  console.log(myData.imageUrl);
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  res.send({ data: null, error: false, status: 200 });
  res.end();
});

router.post("/addcomment", (req, res) => {
  // var postId = mongoose.Types.ObjectId(req.body._id);
  // var postId=ObjectId(req.body._id);
  var comment = req.body.comment;
  console.log(comment);
  console.log(req.body._id);
  Post.update({ '_id': ObjectID(req.body._id) }, { $push: { comments: comment } })
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to find to database");
    });
});

router.post("/addpost",(req, res) => {
  var myData = new Post(req.body);
  console.log('req data');
  myData.imageUrl = req.body.imageUrl; 
  console.log(myData); 
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  res.send({ data: null, error: false, status: 200 });
  res.end();
});
// Export router
module.exports = router;
