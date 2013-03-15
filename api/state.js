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
  app.get('/', function(req, res) {
    var reg = req.findRegistration(res);
    var state = reg ? req.findState(reg) : null;
    if (state) {
      res.send(state);
    } else {
      res.send(404);
    }
  });


  //
  // State#POST
  //
  app.post('/', function(req, res) {
    throw new Error('Not Implemented: State#POST');
  });


  //
  // State#PUT - Write State for a Registration
  //
  app.put('/', function(req, res) {
    var reg = req.findRegistration();
    if (reg) {
      req.saveState(reg);
      res.send(204);
    }
  });

  return app;

}();

