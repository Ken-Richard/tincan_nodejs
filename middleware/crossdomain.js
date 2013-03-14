//
// Add headers for cross domain access from S3.
// Also handles the OPTIONS verb
//

exports.middleware = function(req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://s3.amazonaws.com");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', "true");

  if (req.method === 'OPTIONS') {
    console.log("\n\n*** OPTIONS:");
    res.send(200);
  } else {
    next();
  }

};

