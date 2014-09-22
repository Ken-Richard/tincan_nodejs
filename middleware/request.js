//
// Extend the request to include helpers
// for TCAPI
//

var db = require('../config/database.js');
var context = require('../data/context.js');

exports.middleware = function(req, res, next) {

  // Database
  req.db = db.driver;


  //
  // Low Level
  //
  // TODO: Also Check Headers for Non-Alternative API
  //
  req.tcapi_param = function(name) {

    if (this.query[name]) {
      return this.query[name];
    }

    if (this.tcapi_body_params && this.tcapi_body_params[name]) {
      return this.tcapi_body_params[name];
    }

    if (this.tcapi_body_params_content && this.tcapi_body_params_content[name]) {
      return this.tcapi_body_params_content[name];
    }

    if (this.tcapi_body_params_context && this.tcapi_body_params_context[name]) {
      return this.tcapi_body_params_context[name];
    }

    return null;

  };



  //
  // Context Object
  //
  req.tcapi_context = function() {
    return context.build(req);
  };

  next();

};
