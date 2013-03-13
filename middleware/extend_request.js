exports.middleware = function(req, path, handler) {

  req.tcapi_method = function() {
    return this.query['method'] || this.method;
  };

  req.tcapi_param = function(name) {
    if (this.tcapi_body_params) {
      return this.query[name] || this.tcapi_body_params[name];
    } else {
      return this.query[name];
    }
  };

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

};
