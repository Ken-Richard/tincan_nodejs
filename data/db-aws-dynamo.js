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
};

exports.reset = function() {
  // Not Implemented - Debug Only
};

exports.allRegistrations = function() {
  // Not Implemented - Debug Only
  return {};
};


//
// Response Handler
//
function responseHelper(err, data, callback) {
  if (err) {
    console.log(err, err.stack);
    throw err;
  } else {
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
    responseHelper(err, data, callback);
  });

};

exports.createRegistration = function(id, callback) {

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
  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': registrationId },
      state_id:        { 'S': context.stateId },
      state_data:      { 'S': JSON.stringify(data) }
    },
    TableName: 'xapi-states'
  }

  dynamodb.getItem(params, function(err, data) {
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

exports.addStatement = function(context,data) {

  console.log("addStatement")
  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': registrationId },
      statement_id:    { 'S': context.statementId },
      statement_data:  { 'S': JSON.stringify(data) }
    },
    TableName: 'xapi-statements'
  }

  dynamodb.getItem(params, function(err, data) {
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

