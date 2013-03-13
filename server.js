var express = require('express');
var app = express();

// Environment
require('./environment.js')(app, express);

// Seed Sample Data
var registrations = require('./data/registration.js');
registrations.generateTestData();

// Cross Origin Headers
app.use(require('./middleware/crossdomain.js').middleware);

// TCAPI Param Parsing
app.use(require('./middleware/tcapi_params.js').middleware);

// TCAPI Method Override
app.use(require('./middleware/tcapi_method_override.js').middleware);

// TCAPI Helpers for Request
app.use(require('./middleware/extend_request.js').middleware);

// Routes
app.use('/TCAPI/statements', require('./api/statements.js'));
app.use('/TCAPI/activities/state', require('./api/state.js'));

// Go!
app.listen(4567);
console.log('Listening on port 4567');
