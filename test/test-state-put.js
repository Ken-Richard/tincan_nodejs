//
// Test PUT for STATE
//

/*
var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var fixtures = require('./helpers/fixtures.js');
var db = require('../data/db-aws-dynamo.js');
db.initialize();

describe('State API', function() {
  describe('Put',function() {

    before(function(done) {
      server.start(done);
    });

    after(function(done) {
      server.stop(done);
    });

    describe('Invalid Registration', function() {

      var data;
      var result;
      var reg;

      before(function(done) {

      fixtures.registrationWithStates(function(d) {
        data = d;
      
        reg = data.registration;

        client.putState('bogus-reg-id', 'bugus-activity-id', 'bogus-state-id',
          fixtures.actor, "qqq",
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


    describe('Save New State', function() {

      var data;
      var result;
      var reg;

      before(function(done) {
        fixtures.registrationWithStates(function(d) {
          data = d;
          reg = data.registration;
          client.putState(data.registrationId, data.activityId, 'my-state-id', fixtures.actor,
            "my-new-state-data",
            function(response) {
              result = response;
              done();
            }
          );
        });
      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 204);
        var context = data;
        context.stateId = 'my-state-id';
        db.getState(context,function(state) {
          state.should.equal('my-new-state-data');  
        });
      });

    });


    describe('Overwrite Existing State', function() {

      var data;
      var result;
      var reg;

      before(function(done) {

        fixtures.registrationWithStates(function(d) {
          data = d;
          reg = data.registration;

          db.getState(data, function(state) {
            state.should.equal('STATE-DATA-A');  
          });
          
          // Issue Request
          client.putState(data.registrationId, data.activityId, data.stateId, fixtures.actor,
            "replaced-state-data",
            function(response) {
              result = response;
              done();
            }
          );

        });

      });

      it('should change the state', function() {
        result.should.have.property('statusCode', 204);
        db.getRegistration(data.registrationId,function(reg) {
          db.getState(data, function(state) {
            state.should.equal('replaced-state-data');  
          });
        });
      });

    });

  });
});
*/