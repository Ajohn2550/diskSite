var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  FirstName: String,
  LastName: String,
  Course: String,
  Date: { type: Date, default: Date.now },
  Holes: [{
    Hole: Number,
    Par: Number,
    Score: Number
  }]
});

module.exports = mongoose.model('Score', ScoreSchema);