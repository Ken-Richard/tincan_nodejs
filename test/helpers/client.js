//
// Test Helper for Client HTTP Requests
//

var http = require('http');
var qs = require('querystring');

var state_url = '/xAPI/activities/state';
var statement_url = '/xAPI/statements';


//
// STATE HELPERS
//

var stateParams = function(registration_id, activity_id, state_id, actor) {
  return {
    registration:   registration_id,
    activityId:     activity_id,
    stateId:        state_id,
    actor:          actor,
    'Content-Type': 'application/json'
  };
};

exports.getState = function(registration_id, activity_id, state_id, actor, callback) {
  var query = { method: 'GET' };
  var params = stateParams(registration_id,activity_id,state_id, actor);
  exports.post(state_url, query, params, null, callback);
};

exports.putState = function(registration_id, activity_id, state_id, actor, data, callback) {
  var query = { method: 'PUT' };
  var params = stateParams(registration_id,activity_id,state_id, actor);
  exports.post(state_url, query, params, data, callback);
};

exports.postState = function(registration_id, activity_id, state_id, actor, data, callback) {
  var query = { method: 'POST' };
  var params = stateParams(registration_id,activity_id,state_id, actor);
  exports.post(state_url, query, params, data, callback);
}

exports.deleteState = function(registration_id, activity_id, state_id, actor, callback) {
  var query = { method: 'DELETE' };
  var params = stateParams(registration_id,activity_id,state_id, actor);
  exports.post(state_url, query, params, null, callback);
};




var statementParams = function(registration_id, statement_id) {
  return {
    registration:   registration_id,
    statementId:    statement_id,
    'Content-Type': 'application/json'
  };
};

exports.putStatement = function(registration_id, statement_id, statement, callback) {
  var query = { method: 'PUT' };
  var params = statementParams(registration_id,statement_id);
  exports.post(statement_url, query, params, JSON.stringify(statement), callback);
};

exports.getStatement = function(registration_id, statement_id, callback) {
  var query = { method: 'GET' };
  var params = statementParams(registration_id,statement_id);
  exports.post(statement_url, query, params, null, callback);
}

exports.deleteStatement  = function(registration_id, statement_id, callback) {
  var query = { method: 'DELETE' };
  var params = statementParams(registration_id,statement_id);
  exports.post(statement_url, query, params, null, callback);
}






//
// HTTP HELPERS
//

exports.post = function(url, query, params, post_data, callback) {

  var options = {
    hostname: 'localhost',
    port: 3001,
    path: url + '?' + qs.stringify(query),
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  };

  var req = http.request(options, function(res) {

    var data = '';

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var result = {};
      result.statusCode = res.statusCode;
      result.data = data;
      callback(result);
    });

  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    callback(null);
  });

  // Format Body
  var bodyData = [
      "Content-Type=application/json",
      qs.stringify(params)
  ];

  if (post_data) {
    bodyData.push("content=" + escape(post_data));
  }

  // write data to request body
  req.write(bodyData.join("&"));
  req.end();

};
