//
// Statement API
//
// Specification:
// https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#72-statement-api

var db = require('../config/database.js').driver;

module.exports = function() {

  var express = require('express');
  var app = express();


  //
  // Statement#PUT - Save a State
  //
  // TODO - If statement exists check for a match
  // before returning the 409.
  //
  app.put('/', function(req, res) {

    var context = req.tcapi_context();
    var reg = db.getRegistration(context.registrationId);
    var statementId = context.statementId;
    var statementData = reg && statementId ? db.getStatement(context) : null;
    var data = JSON.parse(req.tcapi_body_params.content);

    if (reg && statementId && statementData) {
      // Already Exits - Error per Spec
      res.send(409);
    } else if (reg && statementId) {
      // Good Request
      db.addStatement(context,data);
      res.send(204);
    } else {
      res.send(404);
    }

  });


  //
  // Statement#GET - Get a Statement
  //
  // TODO - Reverse Chronoligical Order
  // TODO - Maximum Results with More URL
  //
  app.get('/', function(req, res) {

    var context = req.tcapi_context();
    var reg = db.getRegistration(context.registrationId);
    var statementId = context.statementId;
    var statementData = reg && statementId ? db.getStatement(context) : null;

    if (reg && statementId && statementData) {
      res.send(statementData);
    } else if (reg && !statementId) {
      var data = {
        statements: db.findStatements(context)
      };
      res.send(JSON.stringify(data));
    } else {
      res.send(404);
    }

  });


  app.post('/', function(req, res) {
    res.send("Not Implemented", 500);
  });


  app.delete('/', function(req, res) {
    res.send("Not supporte in the standard", 400);
  });


  return app;

}();
