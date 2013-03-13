var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log("********** STATEMENT#GET ********** " + req.registration_id() );
  res.send('Hello World');
});

app.post('/', function(req, res) {
  console.log("********** STATEMENT#PUT ********** " + req.registration_id() );
  res.send('Hello World');
});

app.put('/', function(req, res) {
  console.log("********** STATEMENT#POST ********** " + req.registration_id() );
  res.send('Hello World');
});

