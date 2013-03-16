//
// Server for Test Cases
//

// http://stackoverflow.com/questions/13293257/nodejs-express-close-server-when-request-is-done

var server = require('../../config/server.js');
var srv = require('http').createServer(server);

exports.start = function(done) {
  srv.listen(4567,done);
  console.log('Listening on port 4567');
};

exports.stop = function(done) {
  srv.close(done);
}
