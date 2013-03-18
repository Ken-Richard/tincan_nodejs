//
// Test DELETE for STATEMENT
//
// Not in the spec - will return bad request error
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-memory.js');

describe('Statement API', function() {
  describe('Delete',function() {

    before(function(done) {
      server.start(done);
    });

    after(function(done) {
      server.stop(done);
    });

    describe('Error', function() {

      var result;

      before(function(done) {

        // Setup Single Registration witout state
        var data = fixtures.registrationWithStatements();

        // Issue Request
        client.deleteStatement(data.registrationId, data.statementId, function(response) {
          result = response;
          done();
        });
      });

      it('should return an 400 bad request error', function() {
        result.should.have.property('statusCode', 400);
      });

    });


  });
});
