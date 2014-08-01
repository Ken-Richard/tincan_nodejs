//
// Test PUT for STATEMENT
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../config/database.js').driver;

describe('Statement API', function() {
  describe('Put',function() {

    this.timeout(5000);
    before(function(done) { server.start(done); });
    after(function(done)  { server.stop(done);  });

    ////////////////////////////////////////////////////////////
    //
    // Invalid Registration
    //
    describe('Invalid Registration', function() {
      var result;
      before(function(done) {
        db.reset(function() {
          client.putStatement('bogus-reg', 'bugus-stm-id', fixtures.statement_1,
            function(response) {
              result = response;
              done();
            }
          );
        })
      });
      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 404);
      });
    });


    ////////////////////////////////////////////////////////////
    //
    // New Statement
    //
    describe('New', function() {
      var result;
      var data;
      var reg;
      before(function(done) {
        fixtures.registrationOnly(function(d) {
          data = d;
          var stmt = fixtures.statement_1;
          var stmtId = fixtures.statement_id_1;
          client.putStatement(data, stmtId, stmt,
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



    ////////////////////////////////////////////////////////////
    //
    // New Statement
    //
    describe('New with Duplicate', function() {
      var result;
      var reg;
      before(function(done) {
        fixtures.registrationWithStatements(function(data) {
          var stmt = fixtures.statement_1;
          var stmtId = fixtures.statement_id_1;
          client.putStatement(data.registrationId, data.statementId, data.statement,
            function(response) {
              result = response;
              done();
            }
          );
        });
      });
      it('should not change the state', function() {
        result.should.have.property('statusCode', 409);
      });
    });

  });
});
