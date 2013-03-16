//
// Test PUT for STATE
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

  describe('Put',function() {



    describe('Invalid Registration', function() {

      var result;

      before(function(done) {
        client.putState('bogus', 'bugus', 'bogus', fixtures.actor, "qqq",
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



    describe('Save New State', function() {

      var result;
      var data;

      before(function(done) {

        // Setup Single Registration witout state
        data = fixtures.registrationOnly();

        // Issue Request
        client.putState(data.registrationId, data.activityId, 'my-state-id', fixtures.actor,
          "my-new-state-data",
          function(response) {
            result = response;
            done();
          }
        );

      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 204);
        var reg = db.loadRegistration(data.registrationId);
        var state = reg.state["my-state-id"];
        state.should.equal('my-new-state-data');
      });

    });



    describe('Overwrite Existing State', function() {

      var result;
      var data;

      before(function(done) {

        // Setup Single Registration witout state
        data = fixtures.registrationWithStates();

        // Issue Request
        client.putState(data.registrationId, data.activityId, data.stateId, fixtures.actor,
          "new-state-data",
          function(response) {
            result = response;
            done();
          }
        );

      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 204);
        var reg = db.loadRegistration(data.registrationId);
        var state = reg.state[data.stateId];
        state.should.equal('new-state-data');
      });

    });



  });
});
