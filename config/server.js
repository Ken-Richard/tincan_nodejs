// Configure the server
module.exports = function() {

  var express = require('express');
  var app = express();
  var db = require('./database.js');

  // Environment
  require('./environment.js')(app, express);

  // Database
  db.driver.initialize();

  // Middleware
  app.use(require('../middleware/crossdomain.js').middleware);
  app.use(require('../middleware/method.js').middleware);
  app.use(require('../middleware/params.js').middleware);
  app.use(require('../middleware/request.js').middleware);
  app.use(require('../middleware/logger.js').middleware);

  // Routes
  app.use('/xAPI/statements', require('../api/statements.js'));
  app.use('/xAPI/activities/state', require('../api/state.js'));

  // Debug Page
  app.use('/debug', require('../api/debug.js'));

  return app;

}();
