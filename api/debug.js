//
// Dump Registration Data to JSON and Console
//

var registration = require('../data/registration.js');

module.exports = function() {

  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    console.log(registration.all);
    res.send(registration.all);
  });

  return app;

}();
