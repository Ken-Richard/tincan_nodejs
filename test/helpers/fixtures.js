//
// Data Fixtures for testing
//

var db = require('../../data/db-memory.js');

exports.actor = {
  objectType:   "Agent",
  name:         "Sample Student",
  mbox:         "student@example.com"
};

exports.registrationOnly = function() {
  db.reset();
  var reg = db.createRegistration('registration-id');
  return {
    registrationId: reg.id,
    activityId: 'activity-id'
  };
};

exports.registrationWithStates = function() {
  var data = exports.registrationOnly();

  var reg = db.loadRegistration(data.registrationId);
  reg.setState('state-id-a',"STATE-DATA-A");
  reg.setState('state-id-b',"STATE-DATA-B");

  return {
    registrationId: reg.id,
    registration: reg,
    activityId: 'activity-id',
    stateId: 'state-id-a',
    stateValue: 'STATE-DATA-A'
  };

};


exports.registrationWithStatements = function() {
  var data = exports.registrationOnly();

  var reg = db.loadRegistration(data.registrationId);
  reg.setStatement('state-id-a', { name: 'statement-a'} );
  reg.setStatement('state-id-b', { name: 'statement-b'});

  return {
    registrationId: reg.id,
    registration: reg,
    activityId: 'activity-id',
    statementId: 'state-id-a',
    statementValue: { name: 'statement-a'}
  };

};
