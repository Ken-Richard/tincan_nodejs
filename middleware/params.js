//
// Can't use normal parsing because TCAPI
// always uses Content Type JSON -- Even when
// data is form encoded
//

var qs = require('querystring');

exports.middleware = function(req, res, next) {

  var data = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.rawBody = data;
    console.log("PARAM-BEFORE:");
    console.log(data);
    console.log("PARAM-AFTER: ");
    console.log(qs.parse(data));
    req.tcapi_body_params = qs.parse(data);
    next();
  });

};
