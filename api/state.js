//
// State API
//
// Specification:
// https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#74-state-api

module.exports = function() {

  var express = require('express');
  var app = express();


  //
  // State#GET - Get State for a Registration
  //
  // TODO: Since Parameter
  //
  app.get('/', function(req, res) {

    var reg = req.findRegistration(res);
    var stateId = req.tcapi_state_id();
    var stateData = reg && stateId ? reg.getState(stateId) : null;

    if (reg && stateId && stateData) {
      res.send(stateData);
    } else if (reg && !stateId) {
      res.send(JSON.stringify(reg.getStateKeys()));
    } else {
      res.send(404);
    }

  });


  //
  // State#PUT - Write State for a Registration
  //
  app.put('/', function(req, res) {

    var reg = req.findRegistration();
    var stateId = req.tcapi_state_id();
    var stateData = req.tcapi_body_params.content;

    if (reg) {
      reg.setState(stateId,stateData);
      res.send(204);
    } else {
      res.send(404);
    }

  });


  //
  // State#DELETE
  //
  app.delete('/', function(req, res) {

    var reg = req.findRegistration(res);
    var stateId = req.tcapi_state_id();
    var stateData = reg && stateId ? reg.getState(stateId) : null;

    if (reg && stateId && stateData) {
      reg.deleteState(stateId);
      res.send(204);
    } else if (reg && !stateId) {
      reg.deleteState();
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

