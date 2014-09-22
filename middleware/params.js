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
    req.tcapi_body_params = qs.parse(data);

    if (req.tcapi_body_params.content && req.tcapi_body_params.content.indexOf('{')>=0) {
      req.tcapi_body_params_content = JSON.parse(req.tcapi_body_params.content);
    }

    if (req.tcapi_body_params_content && req.tcapi_body_params_content['context']) {
      req.tcapi_body_params_context = req.tcapi_body_params_content['context'];
    }

    next();
  });

};
