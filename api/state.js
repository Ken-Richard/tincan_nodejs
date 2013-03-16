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
    if (reg) {
      if (req.tcapi_state_id()) {
        // With State ID Param
        var state = reg ? req.findState(reg) : null;
        if (state) {
          res.send(state);
        } else {
          res.send(404);
       }
      } else {
        // Without State ID Param
        res.send(JSON.stringify(req.stateKeys(reg)));
      }
    } else {
      res.send(404);
    }
  });



  //
  // State#PUT - Write State for a Registration
  //
  app.put('/', function(req, res) {
    var reg = req.findRegistration();
    if (reg) {
      req.saveState(reg);
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



  //
  // State#DELETE
  //
  app.delete('/', function(req, res) {
    var reg = req.findRegistration(res);
    if (reg) {
      if (req.tcapi_state_id()) {
        // With State ID Param
        var state = reg ? req.findState(reg) : null;
        if (state) {
          req.deleteState(reg, req.tcapi_state_id());
          res.send(204);
        } else {
          res.send(404);
       }
      } else {
        // Without State ID Param
        req.deleteState(reg,null);
        res.send(204);
      }
    } else {
      res.send(404);
    }
  });

  return app;

}();

