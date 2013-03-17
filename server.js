var server = require('./config/server.js');

// Ready!
var port = process.env.PORT || 4567;
server.listen(port);
console.log('Listening on port ' + port);

