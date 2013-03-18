//
// Simple In-Memory Data Store
//

var registrations = {};

function Registration(id) {
  this.id = id;
  this.states = {};
  this.statements = {};
}

exports.initialize = function() {
  // Test Data
  return exports.createRegistration('SAMPLE-REGISTRATION-ID');
};

exports.reset = function() {
  console.log("*** RESET DATABASE ***");
  registrations = {};
};


//
// Public Interface - Registrations
//

// All Registrations
exports.allRegistrations = function() {
  return registrations;
};

// Load Specific Registration
exports.getRegistration = function(registrationId) {
  return registrations[registrationId];
};

exports.createRegistration = function(id) {
  var reg = new Registration(id);
  registrations[id] = reg;
  return reg;
};



//
// Public Interface - States
//

exports.getState = function(context) {
  var reg = registrations[context.registrationId];
  return reg.states[context.stateId];
};

exports.getStateKeys = function(context) {
  var reg = registrations[context.registrationId];
  return Object.keys(reg.states);
};

exports.setState = function(context,data) {
  var reg = registrations[context.registrationId];
  reg.states[context.stateId] = data;
};

exports.deleteState = function(context) {
  var reg = registrations[context.registrationId];
  if (context.stateId) {
    delete reg.states[context.stateId];
  } else {
    reg.states = {};
  }
};



//
// Public Interface - Statements
//

exports.getStatement = function(context) {
  var reg = registrations[context.registrationId];
  return reg.statements[context.statementId];
};

exports.addStatement = function(context,data) {
  var reg = registrations[context.registrationId];
  reg.statements[context.statementId] = data;
};

exports.findStatements = function(context) {
  var reg = registrations[context.registrationId];
  return reg.statements;
};

