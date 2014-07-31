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

exports.statement_id_1 = 'MY-STATEMENT-ID-1';

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

exports.statement_id_2 = 'MY-STATEMENT-ID-2';

exports.statement_2 = {
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

exports.registrationOnly = function(callback) {
  db.reset();
  db.createRegistration('registration-id', function(reg) {
    callback({
      registrationId: reg.id,
      registration: reg,
      activityId: 'activity-id'
    });   
  });
};

exports.registrationWithStates = function(callback) {
  exports.registrationOnly(function(data) {
    var reg = data.registration;
    reg.states['state-id-a'] = "STATE-DATA-A";
    reg.states['state-id-b'] = "STATE-DATA-B";
    callback({
      registrationId: reg.id,
      registration: reg,
      activityId: 'activity-id',
      stateId: 'state-id-a',
      stateValue: 'STATE-DATA-A'
    });
  });
};

exports.registrationWithStatements = function(callback) {
  exports.registrationOnly(function(data) {
    var reg = data.registration;
    reg.statements[exports.statement_id_1] = exports.statement_1;
    reg.statements[exports.statement_id_2] = exports.statement_2;
    callback({
      registrationId: reg.id,
      registration: reg,
      statementId: exports.statement_id_1,
      statement: { name: exports.statement_1 }
    });
  });
};
