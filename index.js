var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();

var db = mongojs('birds');
var sightings = db.collection('sightings');

app.use(bodyParser.json());
app.use(cors());


app.get('/api/sightings', function(req, res, next) {
  sightings.find(req.query, function(err, result) {
    if (err) result.send(err);
    else res.send(result);
  });
});

app.put('/api/sightings', function(req, res, next) {
  sightings.findAndModify({query:{_id: mongojs.ObjectId(req.query.id)}, update:{$set: req.body}}, function(err, result) {
    if (err) result.send(err);
    else res.send(result);
  });
});

app.post('/api/sightings', function(req, res, next) {
  sightings.insert(req.body, function(err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
});

app.delete('/api/sightings', function(req, res, next) {
  sightings.remove({"_id": mongojs.ObjectId(req.query.id)}, function(err, result) {
    if (err) result.send(err);
    else res.send(result);
  });
});



var port = 3000;
app.listen(port, function() {
  console.log('listening on port ' + port)
});
