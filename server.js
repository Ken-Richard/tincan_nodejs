var express = require('express');
var app = express();

// Environment
require('./config/environment.js')(app, express);

// TCAPI Support Middleware
app.use(require('./middleware/crossdomain.js').middleware);
app.use(require('./middleware/method.js').middleware);
app.use(require('./middleware/params.js').middleware);
app.use(require('./middleware/request.js').middleware);
//app.use(require('./middleware/logger.js').middleware);

// Routes
app.use('/TCAPI/statements', require('./api/statements.js'));
app.use('/TCAPI/activities/state', require('./api/state.js'));

// Debug Page
app.use('/debug', require('./api/debug.js'));

// Ready!
app.listen(process.env.PORT || 4567);
console.log('Listening on port 4567');

