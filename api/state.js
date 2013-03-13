module.exports = function() {

  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    console.log("********** STATE#GET ********** " + req.tcapi_registration_id() );
    res.send('Hello World');
  });

  app.post('/', function(req, res) {
    console.log("********** STATE#PUT ********** " + req.tcapi_registration_id() );
    res.send('Hello World');
  });

  app.put('/', function(req, res) {
    console.log("********** STATE#POST ********** " + req.tcapi_registration_id() );
    res.send('Hello World');
  });

  return app;

}();
