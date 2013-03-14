//
// State Controller - GET, POST, PUT
//

module.exports = function() {

  var express = require('express');
  var app = express();

  // Load Registration
  loadRegistration = function(req,res) {
    var reg = req.tcapi_registration();
    if (!reg) {
      console.log("Regstration Not Found");
      res.send(404);
    } else {
      console.log("Found Registration");
    }
    return reg;
  };

  // Load State
  loadState = function(req,res) {
    var reg = loadRegistration(req,res);
    if (reg) {
      var state = reg.state[req.tcapi_state_id()];
      if (!state) {
        console.log("State Not Found");
        res.send(404);
      } else {
        console.log("Found State");
      }
      return state;
    } else {
      return null;
    }
  };

  // State#GET - Get State for a Registration
  app.get('/', function(req, res) {
    console.log("*** STATE#GET");
    var state = loadState(req,res);
    if (state) {
      console.log("Sending State");
      console.log(state);
      res.send(state);
    }
  });

  // State#POST
  app.post('/', function(req, res) {
    throw new Error('Not Implemented: State#POST');
  });

  // State#PUT - Write State for a Registration
  app.put('/', function(req, res) {
    var reg = loadRegistration(req,res);
    if (reg) {
      reg.state[req.tcapi_state_id()] = req.tcapi_body_params.content;
      res.send(204);
    }
  });

  return app;

}();
