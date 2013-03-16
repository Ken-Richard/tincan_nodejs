//
// Test DELETE for STATE
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-memory.js');

describe('State API', function() {

  before(function(done) {
    db.reset();
    server.start(done);
  });

  after(function(done) {
    db.reset();
    server.stop(done);
  });

  describe('Delete',function() {


    describe('Invalid Registration', function() {

      var result;

      before(function(done) {
        client.deleteState('bogus-registration', 'bogus-activity', 'bogus-state', fixtures.actor,
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


    describe('Invalid State Id', function() {

      var result;

      before(function(done) {

        // Setup Single Registration witout state
        var data = fixtures.registrationOnly();

        // Issue Request
        client.deleteState(data.registrationId, 'bogus-activity', 'bogus-state', fixtures.actor,
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



    describe('Specific State', function() {

      var result;
      var data;

      before(function(done) {

        // Setup a registration with a state
        data = fixtures.registrationWithStates();
        Object.keys(data.registration.state).length.should.equal(2);

        client.deleteState(data.registrationId, data.activityId, data.stateId, fixtures.actor,
          function(response) {
            result = response;
            done();
          }
        );
      });

      it('should return the state data', function() {
        result.should.have.property('statusCode', 204);
        Object.keys(data.registration.state).length.should.equal(1);
      });

    });



    describe('All States', function() {

      var result;
      var data;

      before(function(done) {

        // Setup a registration with a state
        data = fixtures.registrationWithStates();
        Object.keys(data.registration.state).length.should.equal(2);

        client.deleteState(data.registrationId, data.activityId, null, fixtures.actor,
          function(response) {
            result = response;
            done();
          }
        );
      });

      it('should return the state data', function() {
        result.should.have.property('statusCode', 204);
        Object.keys(data.registration.state).length.should.equal(0);
      });

    });


  });
});
