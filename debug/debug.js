//
// Dump Registration Data to JSON and Console
//

var db = require('../config/database.js');

module.exports = function() {

  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    console.log(db.driver.allRegistrations());
    res.send(db.driver.allRegistrations());
  });

  return app;

}();
