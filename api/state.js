var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log("********** STATE#GET ********** " + req.registration_id() );
  res.send('Hello World');
});

app.post('/', function(req, res) {
  console.log("********** STATE#PUT ********** " + req.registration_id() );
  res.send('Hello World');
});

app.put('/', function(req, res) {
  console.log("********** STATE#POST ********** " + req.registration_id() );
  res.send('Hello World');
});

