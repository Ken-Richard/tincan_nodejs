//
// Dynamo DB Interface
//

var AWS = require('aws-sdk'); 
AWS.config.loadFromPath('./config/aws.json');

function Registration(id) {
  this.id = id;
  this.states = {};
  this.statements = {};
}

exports.initialize = function(callback) {
  exports.createRegistration('SAMPLE-REGISTRATION-ID', function() {});
};

exports.reset = function() {
  // Not Implemented - Debug Only
};

exports.allRegistrations = function() {
  // Not Implemented - Debug Only
  return {};
};


//
// Response Helpers
//

function isEmpty(map) {
   for(var key in map) {
      if (map.hasOwnProperty(key)) {
         return false;
      }
   }
   return true;
}

function responseHelper(err, data, callback) {
  if (err) {
    console.log(err, err.stack);
    throw err;
  } else if (isEmpty(data)) {
    console.log("No Data");
    callback(null);
  } else {
    console.log(data);
    callback(data);
  }
}


//
// Public Interface - Registrations
//

// Load Specific Registration
exports.getRegistration = function(registrationId, callback) {

  console.log("getRegistration")
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id: { 'S': registrationId }
    },
    TableName: 'xapi-registrations'
  }

  dynamodb.getItem(params, function(err, data) {
    data = data ? data['Item'] : null;
    responseHelper(err, data, callback);
  });

};

exports.createRegistration = function(registrationId, callback) {

  console.log("createRegistration")
  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': registrationId }
    },
    TableName: 'xapi-registrations'
  }
  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};



//
// Public Interface - States
//

exports.getState = function(context, callback) {

  console.log("getState")
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId },
      state_id:         { 'S': context.stateId }
    },
    TableName: 'xapi-states'
  }

  dynamodb.getItem(params, function(err, data) {
    data = data ? data['Item'] : null;
    data = data ? data['state_data'] : null;
    data = data ? data['S'] : null;
    responseHelper(err, data, callback);
  });

};

exports.getStateKeys = function(context, callback) {

  console.log("getStateKeys")
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId }
    },
    TableName: 'xapi-states'
  }

  dynamodb.getItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.setState = function(context, data, callback) {

  console.log("setState")
  console.log(data);

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': context.registrationId },
      state_id:        { 'S': context.stateId },
      state_data:      { 'S': data }
    },
    TableName: 'xapi-states'
  }

  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.deleteState = function(context, callback) {
  // TODO
  console.log("setState")
  callback();
};



//
// Public Interface - Statements
//

exports.getStatement = function(context, callback) {

  console.log("getStatement")
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId },
      statement_id:     { 'S': context.statementId }
    },
    TableName: 'xapi-statements'
  }

  dynamodb.getItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.addStatement = function(context, data, callback) {

  console.log("addStatement")
  console.log(data);

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': context.registrationId },
      statement_id:    { 'S': context.statementId },
      statement_data:  { 'S': JSON.stringify(data) }
    },
    TableName: 'xapi-statements'
  }

  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.findStatements = function(context, callback) {

  console.log("findStatements")
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId }
    },
    TableName: 'xapi-statements'
  }

  dynamodb.getItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

