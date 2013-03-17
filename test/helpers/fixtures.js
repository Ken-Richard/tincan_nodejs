//
// Data Fixtures for testing
//

var db = require('../../data/db-memory.js');

exports.actor = {
  "objectType": "Agent",
  "account": {
    "homePage": "http://www.example.com",
    "name": "1625378"
  }
};

exports.statement_id_1 = 'MY-STATEMENT-ID';

exports.statement_1 = {
  "actor":{
    "objectType": "Agent",
    "mbox":"mailto:xapi@adlnet.gov"
  },
  "verb":{
    "id":"http://adlnet.gov/expapi/verbs/created",
    "display":{
      "en-US":"created"
    }
  },
  "object":{
    "id":"http://example.adlnet.gov/xapi/example/activity"
  }
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
  reg.addStatement('state-id-a', { name: 'statement-a'} );
  reg.addStatement('state-id-b', { name: 'statement-b'} );
  return {
    registrationId: reg.id,
    registration: reg,
    activityId: 'activity-id',
    statementId: 'state-id-a',
    statementValue: { name: 'statement-a'}
  };
};
