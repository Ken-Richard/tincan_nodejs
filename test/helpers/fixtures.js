//
// Data Fixtures for testing
//

var db = require('../../config/database.js').driver;

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
  db.reset(function() {
    db.createRegistration('SAMPLE-REGISTRATION-ID', function(reg) {
      callback(reg);
    });    
  });
};

exports.registrationWithStates = function(callback) {
  exports.registrationOnly(function(registrationId) {

    var context_a = { registrationId: registrationId, stateId: 'state-id-a' };
    db.setState(context_a, "STATE-DATA-A", function(data) {

      var context_b = { registrationId: registrationId, stateId: 'state-id-b' };
      db.setState(context_b, "STATE-DATA-B", function(data) {
        callback({
          registrationId: registrationId,
          activityId: 'activity-id',
          stateId: 'state-id-a',
          stateValue: 'STATE-DATA-A'
        });
      });

    });

  });
};

exports.registrationWithStatements = function(callback) {
  exports.registrationOnly(function(registrationId) {

    var context = { registrationId: registrationId, statementId: exports.statement_id_1 };
    db.addStatement(context, exports.statement_1, function() {

      var context = { registrationId: registrationId, statementId: exports.statement_id_2 };
      db.addStatement(context, exports.statement_2, function() {
        callback({
          registrationId: registrationId,
          statementId: exports.statement_id_1,
          statement: { name: exports.statement_1 }
        });
      });

    });

  });
};
