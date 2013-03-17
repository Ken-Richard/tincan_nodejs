//
// Statement API
//
// Specification:
// https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#72-statement-api

module.exports = function() {

  var express = require('express');
  var app = express();


  //
  // Statement#PUT - Save a State
  //
  app.put('/', function(req, res) {

    var reg = req.findRegistration(res);
    var statementId = req.tcapi_statement_id();
    var statementData = reg && statementId ? reg.getStatement(statementId) : null;
    var data = JSON.parse(req.tcapi_body_params.content);

    if (reg && statementId && statementData) {
      // Already Exits - Error per Spec
      res.send(409);
    } else if (reg && statementId) {
      // Good Request
      reg.addStatement(statementId,data);
      res.send(204);
    } else {
      res.send(404);
    }

  });


  app.get('/', function(req, res) {
    res.send("Not Implemented", 500);
  });


  app.post('/', function(req, res) {
    res.send("Not Implemented", 500);
  });


  app.delete('/', function(req, res) {
    res.send("Not Implemented", 500);
  });


  return app;

}();
