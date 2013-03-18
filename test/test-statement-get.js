//
// Test GET for STATEMENT
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-memory.js');

describe('Statement API', function() {
  describe('Get',function() {

    before(function(done) {
      server.start(done);
    });

    after(function(done) {
      server.stop(done);
    });

    describe('Invalid Registration', function() {

      var result;

      before(function(done) {
        client.getStatement('bogus-registration', 'bogus-stmt', function(response) {
          result = response;
          done();
        });
      });

      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 404);
      });

    });


    describe('Specific Statement', function() {

      var result;

      before(function(done) {

        // Setup Single Registration witout state
        var data = fixtures.registrationWithStatements();

        // Issue Request
        client.getStatement(data.registrationId, data.statementId, function(response) {
          result = response;
          done();
        });
      });

      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 200);
      });

    });



    describe('All Statements', function() {

      var result;

      before(function(done) {

        // Setup Single Registration witout state
        var data = fixtures.registrationWithStatements();

        // Issue Request
        client.getStatement(data.registrationId, null, function(response) {
          result = response;
          done();
        });
      });

      it('should not return an error', function() {
        result.should.have.property('statusCode', 200);
      });

      it('should return an array of statements', function() {
        should.exist(result.data[0]);
        should.exist(result.data[1]);
      });

    });



  });
});
