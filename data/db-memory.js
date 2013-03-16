//
// In-Memory Database for Development & Testing Purposes
// Eventualy there will be other database drivers
//

// Data Store
var registrations = {};

exports.initialize = function() {

  // Create a sample record
  reg = {};
  reg.id = 'b9855f24-2140-4fb8-931d-2a37cf412c2e';
  reg.state = {};
  reg.statements = {};
  registrations[reg.id] = reg;

}

// All Registrations
exports.allRegistrations = function() {
  return registrations;
}

// Create Registration if not found
exports.loadRegistration = function(registrationId) {
  return registrations[registrationId];
};

// Statements
exports.loadStatement = function(registration, statementId) {
  return registration.statements[statementId];
};

exports.saveStatement = function(registration, statementId, statement) {
  registration.statements[statementId] = statement;
};

// States
exports.loadState = function(registration, stateId) {
  return registration.state[stateId];
};

exports.saveState = function(registration, stateId, state) {
  registration.state[stateId] = state;
};

exports.stateKeys = function(registration) {
  return Object.keys(registration.state);
};

exports.deleteState = function(registration, stateId) {
  if (stateId) {
    delete registration.state[stateId];
  } else {
    registration.state = {};
 }
}

// Reset for Testing
exports.reset = function() {
  registrations = {};
}
