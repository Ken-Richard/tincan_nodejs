//
// Extend the request to include helpers
// for TCAPI
//

var registration = require('../data/registration.js');

exports.middleware = function(req, res, next) {

  // Low Level
  req.tcapi_param = function(name) {
    if (this.tcapi_body_params) {
      return this.query[name] || this.tcapi_body_params[name];
    } else {
      return this.query[name];
    }
  };

  // TCAPI Query Parameters
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


  // Database Lookup
  req.tcapi_registration = function() {
    return registration.find(this.tcapi_registration_id());
  };

  next();

};
