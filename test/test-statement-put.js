//
// Test PUT for STATEMENT
//

/*
var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-aws-dynamo.js');
db.initialize();

describe('Statement API', function() {
  describe('Put',function() {

    before(function(done) {
      server.start(done);
    });

    after(function(done) {
      server.stop(done);
    });

    describe('Invalid Registration', function() {

      var result;

      before(function(done) {

        client.putStatement('bogus-reg', 'bugus-stm-id', fixtures.statement_1,
          function(response) {
            result = response;
            done();
          }
        );

      });

      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 404);
      });

    });


    describe('New', function() {

      var result;
      var data;
      var reg;

      before(function(done) {

        // Setup with statement
        fixtures.registrationOnly(function(d) {

          data = d;

          // Params
          var stmt = fixtures.statement_1;
          var stmtId = fixtures.statement_id_1;

          // Issue Request
          client.putStatement(data.registrationId, stmtId, stmt,
            function(response) {
              result = response;
              done();
            }
          );

        });

      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 204);
      });

    });

    describe('New with Duplicate', function() {

      var result;
      var reg;

      before(function(done) {

        // Setup with statement
        fixtures.registrationWithStatements(function(data) {
          // Params
          var stmt = fixtures.statement_1;
          var stmtId = fixtures.statement_id_1;

          // Issue Request Twice
          client.putStatement(data.registrationId, data.statementId, data.statement,
            function(response) {
              result = response;
              done();
            }
          );

        });

      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 409);
      });

    });

  });
});
*/