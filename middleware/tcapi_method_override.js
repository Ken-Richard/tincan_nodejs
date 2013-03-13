// TCAPI (Specifically Storyline) sends most requests
// as a POST with the query string method= to specify
// the actual method
exports.middleware = function(req, path, handler) {
  req.originalMethod = req.originalMethod || req.method;
  if (req.query.method) {
    req.method = req.query.method;
  }
};
