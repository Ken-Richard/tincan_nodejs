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

    console.log("Statement#PUT");

    var context = req.tcapi_context();
    db.getRegistration(context.registrationId, function(reg) {

      var statementId = context.statementId;
      db.getStatement(context, function(statementData) {

        var data = JSON.parse(req.tcapi_body_params.content);

        if (reg && statementId && statementData) {
          // Already Exits - Error per Spec
          res.send(409);
        } else if (reg && statementId) {
          // Good Request
          db.addStatement(context, data, function(data) {
            res.send(204);  
          });
        } else {
          res.send(404);
        }

      })

    });

  });


  //
  // Statement#GET - Get a Statement
  //
  // TODO - Reverse Chronoligical Order
  // TODO - Maximum Results with More URL
  //
  app.get('/', function(req, res) {
    console.log("Statement#GET");
    var context = req.tcapi_context();
    db.getRegistration(context.registrationId, function(reg) {

      var statementId = context.statementId;
      if (context.statementId == null || context.statementId.length==0) {
        db.findStatements(context, function(stmts) {
          var data = {
            statements: stmts
          };
          res.send(JSON.stringify(data));            
        })
      } else {
        db.getStatement(context, function(statementData) {
          if (reg && statementId && statementData) {
            res.send(statementData);
          } else {
            res.send(404);
          }
        });
      }
    });

  });


  app.post('/', function(req, res) {

    console.log("Statement#POST");

    res.send("Not Implemented", 500);
  });


  app.delete('/', function(req, res) {
    console.log("Statement#DELETE");
    res.send("Not supporte in the standard", 400);
  });


  return app;

}();
