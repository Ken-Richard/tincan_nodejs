//
// State API
//
// Specification:
// https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#74-state-api

var db = require('../config/database.js').driver;

module.exports = function() {

  var express = require('express');
  var app = express();


  //
  // State#GET - Get State for a Registration
  //
  // TODO: Since Parameter
  //
  app.get('/', function(req, res) {

    var context = req.tcapi_context();
    var reg = db.getRegistration(context.registrationId);
    var stateId = context.stateId;
    var stateData = reg && stateId ? db.getState(context) : null;

    if (reg && stateId && stateData) {
      res.send(stateData);
    } else if (reg && !stateId) {
      res.send(JSON.stringify(db.getStateKeys(context)));
    } else {
      res.send(404);
    }

  });


  //
  // State#PUT - Write State for a Registration
  //
  app.put('/', function(req, res) {

    var context = req.tcapi_context();
    var reg = db.getRegistration(context.registrationId);
    var stateId = context.stateId;
    var stateData = req.tcapi_body_params.content;

    if (reg) {
      db.setState(context,stateData);
      res.send(204);
    } else {
      res.send(404);
    }

  });


  //
  // State#DELETE
  //
  app.delete('/', function(req, res) {

    var context = req.tcapi_context();
    var reg = db.getRegistration(context.registrationId);
    var stateId = context.stateId;
    var stateData = reg && stateId ? db.getState(context) : null;

    if (reg && stateId && stateData) {
      db.deleteState(context);
      res.send(204);
    } else if (reg && !stateId) {
      db.deleteState(context);
      res.send(204);
    } else {
      res.send(404);
    }

  });


  //
  // State#POST
  //
  app.post('/', function(req, res) {
    res.send("Not Implemented", 500);
  });


  return app;

}();

