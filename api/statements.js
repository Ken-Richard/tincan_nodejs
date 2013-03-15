//
// Statement API
//
// Specification:
// https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#72-statement-api

module.exports = function() {

  var express = require('express');
  var app = express();


  //
  // STATEMENT PUT
  //
  // https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#putstatements
  //

  // Statements#PUT - Save Statement for the Registration
  app.put('/', function(req, res) {
    console.log("*** STATEMENT#PUT ");

    var reg = req.findRegistration();
    var exstingStatement = reg ? req.findStatement(reg) : null;

    if (!reg) {
      res.send(404);
    } else if (exstingStatement) {
      res.send(409);
    } else {
      req.saveStatement(reg);
      res.send(204);
    }

  });



  //
  // Statement POST
  //
  // https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#poststatements
  //

  app.post('/', function(req, res) {
    throw new Error('Not Implemented: Statements#POST');
  });
  return app;




  //
  // Statement GET
  //
  // https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#getstatements
  //

  app.get('/', function(req, res) {
    throw new Error('Not Implemented: Statements#GET');
  });


}();
