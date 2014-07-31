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
    if (this.tcapi_body_params) {
      return this.query[name] || this.tcapi_body_params[name];
    } else {
      return this.query[name];
    }
  };



  //
  // Context Object
  //
  req.tcapi_context = function() {
    return context.build(req);
  };

  next();

};
