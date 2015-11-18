var mongoose = require('mongoose');

var birdModel = mongoose.Schema({

  scientificName: {type: String, required:true, unique: true},
  color: {type: String, required:true, unique: true},
  region: String,
  firstSighingEver: Date,
  food: [String],
  foodDetails: [{
    name: String,
    type: {type: String},
    genus: String
  }],
  wingspan: Number,
  endangered: Boolean,
  nest: {
    materials: [String],
    size: Number,
    timeToBuild: Number,
    locationDesc: String
  }

});


birdModel.pre('save', function(next){
  var bird = this;
  bird.scientificName.toLower();
  next();
});

module.exports = mongoose.model('bird', birdModel);
