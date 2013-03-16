//
// Extra Logging for Debugging
//

exports.middleware = function(req, res, next) {

  console.log(req.url + " : QUERY PARAMS:");
  console.log(req.query);

  console.log(req.url + " : BODY PARAMS:");
  console.log(req.tcapi_body_params);

  console.log(req.url + " : RAW BODY:");
  console.log(req.rawBody);

  if (req.tcapi_body_params.content) {
    console.log(req.url + " : BODY CONTENT:");
    console.log(req.tcapi_body_params.content)
  }

  next();
}
