//
// Dynamo DB Interface
//

var AWS = require('aws-sdk'); 
AWS.config.update({
  accessKeyId:      process.env.S3_KEY,
  secretAccessKey:  process.env.S3_SECRET,
  region:           process.env.S3_REGION
});


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
    console.log("** ERROR *********************************************");
    console.log(err, err.stack);
    callback(null);
    throw err;
  } else if (!(data instanceof Array) && isEmpty(data)) {
    callback(null);
  } else {
    callback(data);
  }
}


//
// Public Interface - Registrations
//

exports.allRegistrations = function() {
  // Not Implemented - Debug Only
  return {};
};

// Load Specific Registration
exports.getRegistration = function(registrationId, callback) {

  //console.log("getRegistration:" + registrationId);

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id: { 'S': registrationId }
    },
    TableName: 'xapi-registrations'
  }
  //console.log(params);

  dynamodb.getItem(params, function(err, data) {
    data = data ? data['Item'] : null;
    responseHelper(err, data, callback);
  });

};

exports.createRegistration = function(registrationId, callback) {

  //console.log("createRegistration");

  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': registrationId }
    },
    TableName: 'xapi-registrations'
  }
  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, registrationId, callback);
  });

};

exports.deleteRegistration = function(registrationId, callback) {

  //console.log("deleteRegistration");

  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    TableName: 'xapi-registrations',
    Key: {
      registration_id: { 'S': registrationId }
    },
  }
  dynamodb.deleteItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};


markRegistrationCompleted = function(registrationId, result, callback) {

  var data = { registrationId: registrationId };
  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': registrationId },
      status:          { 'S': 'completed' },
      result:          { 'S': JSON.stringify(result) }
    },
    TableName: 'xapi-registrations'
  }
  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, registrationId, callback);
  });

};


//
// Public Interface - States
//

exports.getState = function(context, callback) {

  //console.log("getState");

  if (context.stateId==null || context.length==0) {
    throw "asdfasdfasdfsadf"; 
  }

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId },
      state_id:         { 'S': context.stateId }
    },
    TableName: 'xapi-states'
  }
  //console.log(params);

  dynamodb.getItem(params, function(err, data) {
    data = data ? data['Item'] : null;
    data = data ? data['state_data'] : null;
    data = data ? data['S'] : null;
    responseHelper(err, data, callback);
  });

};

exports.getStateKeys = function(context, callback) {

  //console.log("getStateKeys");

  var dynamodb = new AWS.DynamoDB();
  var params = {
    TableName: 'xapi-states',
    KeyConditions: {
      registration_id: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [ { 'S': context.registrationId } ]
      }
    },
    AttributesToGet: [ 'state_id' ]
  }
  //console.log(params);

  dynamodb.query(params, function(err, data) {
    data = data ? data['Items'] : null;
    var keys = [];
    if (data) {
      for (var i=0; i<data.length; i++) {
        keys[i] = data[i]['state_id'];
        if (keys[i]['S']) {
          keys[i] = keys[i]['S'];
        }
      }
    }
    responseHelper(err, keys, callback);
  });

};

exports.setState = function(context, data, callback) {

  //console.log("setState");

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Item: {
      registration_id: { 'S': context.registrationId },
      state_id:        { 'S': context.stateId },
      state_data:      { 'S': data }
    },
    TableName: 'xapi-states'
  }
  //console.log(params);

  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.deleteState = function(context, callback) {

  //console.log("deleteState");

  if (context.stateId) {
    var dynamodb = new AWS.DynamoDB();
    var params = {
      Key: {
        registration_id:  { 'S': context.registrationId },
        state_id:         { 'S': context.stateId }
      },
      TableName: 'xapi-states'
    }
    //console.log(params);

    dynamodb.deleteItem(params, function(err, data) {
      responseHelper(err, data, callback);
    });  

  } else {

    // Missing State Id - Delete all for registration per spec
    exports.getStateKeys(context, function(keys) {
      deleteStateList(context.registrationId, keys, callback);
    });

  }

};



//
// Public Interface - Statements
//

exports.getStatement = function(context, callback) {

  //console.log("getStatement");

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': context.registrationId },
      statement_id:     { 'S': context.statementId }
    },
    TableName: 'xapi-statements'
  }
  //console.log(params);

  dynamodb.getItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });

};

exports.addStatement = function(context, data, callback) {

  console.log("addStatement");

  // Spec says to throw an error if already exists

  var dynamodb = new AWS.DynamoDB();
  var params = {
    TableName: 'xapi-statements',
    Item: {
      registration_id: { 'S': context.registrationId },
      statement_id:    { 'S': context.statementId },
    }
    /* TODO ,
    Expected: { Exists: false }    
    */
  }

  var verbName = data['verb'];
  var result = data['result']

  // Break into components
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      params.Item[key] = { 'S': JSON.stringify(data[key]) };
    }
  }

  dynamodb.putItem(params, function(err, data) {
    responseHelper(err, data, function(data) {

      // Check for completion?
      if (verbName=='completed') {
        markRegistrationCompleted(context.registrationId,result,function(not_used) {
          callback(data);
        });
      } else {
        callback(data);
      }
      
    });
  });

};

exports.findStatements = function(context, callback) {

  //console.log("findStatements");

  var dynamodb = new AWS.DynamoDB();
  var params = {
    TableName: 'xapi-statements',
    KeyConditions: {
      registration_id: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [ { 'S': context.registrationId } ]
      }
    }
  }
  //console.log(params);

  dynamodb.query(params, function(err, data) {
    data = data ? data['Items'] : null;
    responseHelper(err, data, callback);
  });

};

exports.deleteStatement = function(registrationId, statementId, callback) {

  //console.log("deleteStatement");

  var dynamodb = new AWS.DynamoDB();
  var params = {
    Key: {
      registration_id:  { 'S': registrationId },
      statement_id:     { 'S': statementId }
    },
    TableName: 'xapi-statements'
  }

  dynamodb.deleteItem(params, function(err, data) {
    responseHelper(err, data, callback);
  });  

}




/////////////
///////////// Helpers for Data Reset
/////////////


deleteStatementList = function(data,callback) {
  if (data==null || data.length == 0) {
    callback();
  } else {
    var item = data.pop();
    var statementId = item['statement_id']['S'];
    var registrationId = item['registration_id']['S'];
    exports.deleteStatement(registrationId, statementId, function() {
      deleteStatementList(data, callback);
    });
  }
}

deleteStateList = function(registrationId, keys, callback) {
  if (keys==null || keys.length == 0) {
    callback(true);
  } else {
    var stateId = keys.pop();
    exports.deleteState({registrationId:registrationId, stateId:stateId}, function() {
      deleteStateList(registrationId, keys, callback);
    });
  }
  
}

resetStatements = function(callback) {

  var context = {
    registrationId: 'SAMPLE-REGISTRATION-ID'
  };

  exports.findStatements(context,function(data) {
    deleteStatementList(data, callback);
  });

}

resetStates = function(callback) {

  var context = {
    registrationId: 'SAMPLE-REGISTRATION-ID'
  };

  exports.getStateKeys(context,function(data) {
    deleteStateList('SAMPLE-REGISTRATION-ID', data, callback);
  });

}

resetRegistrations = function(callback) {

}

exports.reset = function(callback) {

  // Delete everything associated with the sample
  // registration, and then re-create the sample
  // for the test cases
  
  resetStatements(function() {
    resetStates(function() {
      exports.deleteRegistration('SAMPLE-REGISTRATION-ID', function() {
        exports.createRegistration('SAMPLE-REGISTRATION-ID', function() {
          callback();      
        })
      })
    })
  });
};

