//
// In-Memory Database for Development & Testing Purposes
//

// Data Store
var registrations = {};

// All Registrations
exports.allRegistrations = function() {
  return registrations;
}

// Create Registration if not found
exports.loadRegistration = function(registrationId) {
  var reg = registrations[registrationId];
  if (!reg) {
    reg = {};
    reg.id = registrationId;
    reg.state = {};
    reg.statements = {};
    registrations[registrationId] = reg;
  }
  return reg;
};

// States
exports.loadStatement = function(registration, statementId) {
  return registration.statements[statementId];
};

exports.saveStatement = function(registration, statementId, statement) {
  registration.statements[statementId] = statement;
};

// Statements
exports.loadState = function(registration, stateId) {
  return registration.state[stateId];
};

exports.saveState = function(registration, stateId, state) {
  registration.state[stateId] = statement;
};



