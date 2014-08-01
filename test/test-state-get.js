//
// Test GET for STATE
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../config/database.js').driver;

describe('State API', function() {
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



    ////////////////////////////////////////////////////////////
    //
    // Invalid State ID
    //
    describe('Invalid State Id', function() {
      var result;
      before(function(done) {
        // Setup Single Registration witout state
        fixtures.registrationOnly(function(registrationId) {
          // Issue Request
          client.getState(registrationId, 'bogus-activity', 'bogus-state', fixtures.actor,
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

    ////////////////////////////////////////////////////////////
    //
    // Specific State
    //
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


    ////////////////////////////////////////////////////////////
    //
    // List of State IDs
    //
    describe('List of State IDs', function() {
      var result;
      before(function(done) {
        // Setup a registration with a state
        fixtures.registrationWithStates(function(data) {
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

  });
});
