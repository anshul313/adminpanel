var express = require("express");
var app = express();
const cors = require('cors');
const router = express.Router();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
require("../src/db/conns");
const MensRanking = require("../src/modals/mens");
var port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(router);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
  })
);

const userRoutes = require("./routers/routes");
app.use("/", userRoutes);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    const uniqueName = file.originalname + Date.now();
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

router.get("/route", (req, res) => {
  res.send("route routes called");
});

app.post("/upload", upload.single("uploaded_file"), (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

// sendFile api

app.post("/calculator", function(req, res) {
  let n1 = Number(req.body.v1);
  let n2 = Number(req.body.v2);
  let sum = n1 + n2;
  res.send("total number is :" + sum);
});

// Post request

app.post("/addname", (req, res) => {
  var myData = new MensRanking(req.body);
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Get Request

app.get("/addname", (req, res) => {
  MensRanking.find()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to find to database");
    });
});

app.get("/index", function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

// put Request

app.put("/addname", (req, res) => {
  console.log(req.body);
  MensRanking.update({ Name: req.body.Name }, req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

app.delete("/addname", (req, res) => {
  console.log(req.body);
  MensRanking.remove({ Name: req.body.Name })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
