//
// Test GET for STATE
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-aws-dynamo.js');
db.initialize();

describe('State API', function() {

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
        client.getState('bogus-registration', 'bogus-activity', 'bogus-state', fixtures.actor,
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
        fixtures.registrationOnly(function(data) {

          // Issue Request
          client.getState(data.registrationId, 'bogus-activity', 'bogus-state', fixtures.actor,
            function(response) {
              result = response;
              done();
            }
          );

        });

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
        fixtures.registrationWithStates(function(d) {
          data = d
          client.getState(data.registrationId, data.activityId, data.stateId, fixtures.actor,
            function(response) {
              result = response;
              done();
            }
          );
        });

      });

      it('should return the state data', function() {
        result.should.have.property('statusCode', 200);
        result.data.should.equal(data.stateValue);
      });

    });


/*

    describe('List of State IDs', function() {

      var result;
      var data;

      before(function(done) {

        // Setup a registration with a state
        fixtures.registrationWithStates(function(d) {
          data = d;
          client.getState(data.registrationId, data.activityId, null, fixtures.actor,
            function(response) {
              result = response;
              done();
            }
          );          
        });

      });

      it('should return the state data', function() {
        result.should.have.property('statusCode', 200);
        result.data.should.equal('["state-id-a","state-id-b"]');
      });

    });

    */

  });
});
