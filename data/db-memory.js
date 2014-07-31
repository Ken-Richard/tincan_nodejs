//
// Simple In-Memory Data Store
//

var registrations = {};

function Registration(id) {
  this.id = id;
  this.states = {};
  this.statements = {};
}

exports.initialize = function(callback) {
  // Test Data
  exports.createRegistration('SAMPLE-REGISTRATION-ID', function() {});
};

exports.reset = function() {
  console.log("*** RESET DATABASE ***");
  registrations = {};
};


//
// Public Interface - Registrations
//

// All Registrations - Just for Debugging
exports.allRegistrations = function() {
  return registrations;
};

// Load Specific Registration
exports.getRegistration = function(registrationId, callback) {
  callback(registrations[registrationId]);
};

exports.createRegistration = function(id, callback) {
  var reg = new Registration(id);
  registrations[id] = reg;
  callback(reg);
};



//
// Public Interface - States
//

exports.getState = function(context, callback) {
  if (context.registrationId==null) {
    callback(null);
  } else {
    var reg = registrations[context.registrationId];
    if (reg) {
      callback(reg.states[context.stateId]);
    } else {
      callback(null);
    }
  }
};

exports.getStateKeys = function(context, callback) {
  if (context.registrationId==null) {
    callback(null);
  } else {
    var reg = registrations[context.registrationId];
    if (reg) {
      callback(Object.keys(reg.states));
    } else {
      callback(null);
    }
  }
};

exports.setState = function(context,data, callback) {
  var reg = registrations[context.registrationId];
  reg.states[context.stateId] = data;
  callback();
};

exports.deleteState = function(context, callback) {
  var reg = registrations[context.registrationId];
  if (reg==null) {
    callback(null);
  } else {
    if (context.stateId) {
      delete reg.states[context.stateId];
    } else {
      reg.states = {};
    }
    callback(true);
  }
};



//
// Public Interface - Statements
//

exports.getStatement = function(context, callback) {
  if (context.registrationId==null) {
    callback(null);
  } else {
    var reg = registrations[context.registrationId];
    if (reg) {
      callback(reg.statements[context.statementId]);  
    } else {
      callback(null);
    }
  }
};

exports.addStatement = function(context,data) {
  var reg = registrations[context.registrationId];
  reg.statements[context.statementId] = data;
};

exports.findStatements = function(context, callback) {
  var reg = registrations[context.registrationId];
  callback(reg.statements);
};

