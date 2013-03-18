//
// TCAPI (Specifically Storyline) sends most requests
// as a POST with the query string method= to specify
// the actual method
//

exports.middleware = function(req, res, next) {

  console.log('');
  console.log('');

  req.originalMethod = req.originalMethod || req.method;
  if (req.method != 'OPTIONS' && req.query.method && req.method!=req.query.method) {
    //console.log(req.url + " : Changing Method From:" + req.method + " To:" + req.query.method)
    req.method = req.query.method;
  }
  next();

};
