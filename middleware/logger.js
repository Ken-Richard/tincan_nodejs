//
// Extra Logging for Debugging
//

exports.middleware = function(req, res, next) {
  console.log(req.url + " : QUERY PARAMS:");
  console.log(req.query);
  console.log(req.url + " : BODY PARAMS:");
  console.log(req.tcapi_body_params);
  if (req.tcapi_body_params.content) {
    console.log(req.url + " : BODY CONTENT:");
    console.log(req.tcapi_body_params.content)
  }
  next();
}
