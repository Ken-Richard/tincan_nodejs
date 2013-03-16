//
// Extend the request to include helpers
// for TCAPI
//

var db = require('../config/database.js');

exports.middleware = function(req, res, next) {



  // Database
  req.db = db.driver;



  //
  // Low Level
  //
  // TODO: Also Check Headers for Non-Alternative API
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



  //
  // Database Helpers
  //

  // Registration
  req.findRegistration = function() {
    var regId = this.tcapi_registration_id();
    var registration = this.db.loadRegistration(regId);
    return registration;
  };


  next();

};
