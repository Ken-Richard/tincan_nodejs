//
// Test DELETE for STATE
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../config/database.js').driver;

describe('State API', function() {
  describe('Delete',function() {

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
          client.deleteState('bogus-registration', 'bogus-activity', 'bogus-state', fixtures.actor,
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
    // Invalid State ID
    //
    describe('Invalid State Id', function() {
      var result;
      before(function(done) {
        fixtures.registrationOnly(function(registrationId) {
          client.deleteState(registrationId, 'bogus-activity', 'bogus-state', fixtures.actor, function(response) {
            result = response;
            done();
          });
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
        fixtures.registrationWithStates(function(d) {
          data = d;
          db.getStateKeys(data, function(keys) {
            keys.length.should.equal(2);
          });
          client.deleteState(data.registrationId, data.activityId, data.stateId, fixtures.actor,
            function(response) {
              result = response;
              done();
            }
          );
        });
        it('should return the state data', function() {
          result.should.have.property('statusCode', 204);
          db.getStateKeys(data, function(keys) {
            keys.length.should.equal(1);
          });          
        });
      });
    });




    ////////////////////////////////////////////////////////////
    //
    // Get All States
    //
    describe('All States', function() {
      var result;
      var savedData;
      before(function(done) {
        fixtures.registrationWithStates(function(data) {
          savedData = data;
          db.getStateKeys(data, function(keys) {
            keys.length.should.equal(2);
            client.deleteState(data.registrationId, data.activityId, null, fixtures.actor,
              function(response) {
                result = response;
                done();
              }
            );
          });
        });
      });
      it('should return the state data', function() {
        result.should.have.property('statusCode', 204);
        db.getStateKeys(savedData, function(keys) {
          keys.length.should.equal(0);
        });        
      });
    });


  });
});
