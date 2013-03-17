//
// Test POST for STATE
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-memory.js');

describe('State API', function() {
  describe('Post',function() {

    before(function(done) {
      server.start(done);
    });

    after(function(done) {
      server.stop(done);
    });

    beforeEach(function(done) {
      db.reset();
      done();
    });

    var result;

    before(function(done) {
      client.postState('bogus', 'bogus', 'bogus', fixtures.actor, null,
        function(response) {
          result = response;
          done();
        }
      );
    });

    it('should not be implemented', function() {
      result.should.have.property('statusCode', 500);
    });

  });

});

