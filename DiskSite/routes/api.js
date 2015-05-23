var mongoose = require('mongoose'); // Require the mongoose module
var express = require('express');
var router = express.Router();
mongoose.connect('mongodb://localhost/diskSite'); // MongoDB connection

var Score = require('../models/score');

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('This is the api... Docs Coming soon? Maybe? Not Really? Possibly in the future??');
});

router.route('/scores')
.post(function (req, res) {
  var score = new Score();
  score.FirstName = req.body.FirstName;
  score.LastName = req.body.LastName;
  score.Course = req.body.Course;
  req.body.Holes.map(function (hole) {
    score.Holes.push({ Hole: hole.Hole, Par: hole.Par, Score: hole.Score });
  });
  score.save(function (err) {
    if (err) {
      res.status(400).json({ error: true, message: err });
    } else {
      res.status(201).json({ error: false, data: score });
    }
  })
})
.get(function (req, res) {
  Score.find(function (err, scores) {
    if (err) {
      res.status(400).json({ error: true, message: err });
    } else {
      res.status(200).json({ error: false, data: scores });
    }
  })
});

module.exports = router;