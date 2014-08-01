//
// Test GET for STATEMENT
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../config/database.js').driver;

describe('Statement API', function() {
  describe('Get',function() {

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
        client.getStatement('bogus-registration', 'bogus-stmt', function(response) {
          result = response;
          done();
        });
      });
      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 404);
      });
    });



    ////////////////////////////////////////////////////////////
    //
    // Specific Statement
    //
    describe('Specific Statement', function() {
      var result;
      before(function(done) {
        fixtures.registrationWithStatements(function(data) {
          client.getStatement(data.registrationId, data.statementId, function(response) {
            result = response;
            done();
          });          
        });
      });
      it('should return an 404 error', function() {
        result.should.have.property('statusCode', 200);
      });
    });



    ////////////////////////////////////////////////////////////
    //
    // All Statements
    //
    describe('All Statements', function() {
      var result;
      before(function(done) {
        fixtures.registrationWithStatements(function(data) {
          client.getStatement(data.registrationId, null, function(response) {
            result = response;
            done();
          });          
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
