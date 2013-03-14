//
// Statement Controller - GET, POST, PUT
//

module.exports = function() {

  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    throw new Error('Not Implemented: Statements#GET');
  });

  app.post('/', function(req, res) {
    throw new Error('Not Implemented: Statements#POST');
  });

  app.put('/', function(req, res) {
    console.log("*** STATEMENT#PUT ");

    var reg = req.tcapi_registration();
    var statementId = req.tcapi_statement_id();
    var data = req.tcapi_body_params.content;

    if (reg==null) {
      console.log("Regstration Not Found");
      res.send(404);
    } else {
      reg.statements[statementId] = data;
      res.send(204);
    }

  });

  return app;

}();
