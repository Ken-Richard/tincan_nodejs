//
// Extend the request to include helpers
// for TCAPI
//

var db = require('../config/database.js');

exports.middleware = function(req, res, next) {

  //
  // Low Level
  //
  req.tcapi_param = function(name) {
    if (this.tcapi_body_params) {
      return this.query[name] || this.tcapi_body_params[name];
    } else {
      return this.query[name];
    }
  };

  //
  // Common Parameters
  //
  req.tcapi_registration_id = function() {
    return this.tcapi_param('registration');
  };

  req.tcapi_activity_id = function() {
    return this.tcapi_param('activity_id');
  };

  req.tcapi_actor = function() {
    return this.tcapi_param('actor');
  };

  req.tcapi_endpoint = function() {
    return this.tcapi_param('endpoint');
  };

  req.tcapi_state_id = function() {
    return this.tcapi_param('stateId');
  };

  req.tcapi_statement_id = function() {
    return this.tcapi_param('statementId');
  };

  // Database
  req.db = db.driver;


  //
  // Database Helpers
  //

  // Registration
  req.findRegistration = function() {
    var regId = this.tcapi_registration_id();
    var registration = this.db.loadRegistration(regId);
    return registration;
  };

  // States

  req.findState = function(registration) {
    var state = null;
    if (registration) {
      var stateId = this.tcapi_state_id();
      state = this.db.loadState(registration,stateId);
    }
    return state;
  };

  req.saveState = function(registration) {
    if (registration) {
      var stateId = this.tcapi_state_id();
      this.db.saveState(registration,stateId, JSON.parse(req.tcapi_body_params.content));
    }
  };

  // Statements

  req.findStatement = function(registration) {
    var statement = null;
    if (registration) {
      var statementId = this.tcapi_statement_id();
      statement = this.db.loadStatement(registration,statementId);
    }
    return statement;
  };

  req.saveStatement = function(registration) {
    if (registration) {
      var statementId = this.tcapi_statement_id();
      this.db.saveStatement(registration,statementId, JSON.parse(req.tcapi_body_params.content));
    }
  };

  next();

};
