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
  var reg = {};
  reg.id = 'registration-id';
  reg.state = {};
  reg.statements = {};
  db.allRegistrations()[reg.id] = reg;
  return {
    registrationId: reg.id,
    activityId: 'activity-id'
  };
};

exports.registrationWithStates = function() {
  var data = exports.registrationOnly();
  var reg = db.allRegistrations()[data.registrationId];
  reg.state['state-id-a'] = "STATE-DATA-A";
  reg.state['state-id-b'] = "STATE-DATA-B";
  return {
    registrationId: reg.id,
    registration: reg,
    activityId: 'activity-id',
    stateId: 'state-id-a',
    stateValue: 'STATE-DATA-A'
  };
};
