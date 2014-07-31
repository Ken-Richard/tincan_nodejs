var server = require('./config/server.js');

// Ready!
Error.stackTraceLimit = Infinity;
var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);

