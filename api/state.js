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

    console.log("State#GET");

    var context = req.tcapi_context();
    db.getRegistration(context.registrationId, function(reg) {

      var stateId = context.stateId;

      if (stateId==null || stateId.length==0) {

        // Get Keys
        db.getStateKeys(context, function(keys) {
          res.send(JSON.stringify(keys));
        });

      } else {

        // Get State by Key
        db.getState(context, function(stateData) {
          if (reg && stateId && stateData) {
            res.send(stateData);
          } else {
            res.send(404);
          }        
        });

      }

    });

  });


  //
  // State#PUT - Write State for a Registration
  //
  app.put('/', function(req, res) {

    console.log("State#PUT");

    var context = req.tcapi_context();
    db.getRegistration(context.registrationId, function(reg) {

      var stateId = context.stateId;
      var stateData = req.tcapi_body_params.content;

      if (reg) {
        db.setState(context, stateData, function() {
          res.send(204);  
        });
      } else {
        res.send(404);
      }

    });
  });


  //
  // State#DELETE
  //
  app.delete('/', function(req, res) {

    console.log("State#DELETE");

    var context = req.tcapi_context();
    db.getRegistration(context.registrationId, function(reg) {

      var stateId = context.stateId;
      if (stateId && stateId.length > 0) {
        // Verify and Delete
        db.getState(context,function(stateData) {
          if (reg && stateId && stateData) {
            db.deleteState(context, function() { res.send(204);} );
          } else if (reg && !stateId) {
            db.deleteState(context, function() { res.send(204); });
          } else {
            res.send(404);
          }        
        });
      } else if (reg) {
        // Delete Range
        db.deleteState(context, function() { res.send(204);} );
      } else {
        // Bad Params
        res.send(404);
      }

    });
  });



  //
  // State#POST
  //
  app.post('/', function(req, res) {
    console.log("State#POST");
    res.send("Not Implemented", 500);
  });


  return app;

}();

