//
// Extra Logging for Debugging
//
// To customize logging - create a file in the root called
// user-logging.js, with the following contents:
//
//    module.exports = function() {
//      logging = {
//         headers:      true,
//         queryParams:  true,
//         bodyParams:   true,
//         bodyData:     true,
//         content:      true
//      };
//      return logging;
//    }();


var logging;

try {
  logging = require('../user-logging.js');
} catch (e) {
  logging = {
    headers:      true,
    queryParams:  true,
    bodyParams:   true,
    bodyData:     true,
    content:      true
  };
}

exports.middleware = function(req, res, next) {

  if (logging.headers) {
    console.log("== HEADERS ========= " + req.url);
    console.log(req.headers);
  }

  if (logging.queryParams) {
    console.log("== QUERY PARAMS ========= " + req.url);
    console.log(req.query);
  }

  if (logging.bodyParams) {
    console.log("==  BODY PARAMS ========= " + req.url);
    console.log(req.tcapi_body_params);
  }

  if (logging.bodyData) {
    console.log("== RAW BODY ========= " + req.url);
    console.log(req.rawBody);
  }

  if (logging.contnt) {
    console.log("== BODY CONTENT ========= " + req.url);
    console.log(req.tcapi_body_params.content);
  }

  next();
};

