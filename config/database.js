// Set the database driver
//
// Currently there is only one driver for in-memory. Eventually
// there will be database drivers for real applications. The
// memory driver is good for testing

if (process.env.TC_DB=="dynamo") {
  exports.driver = require('../data/db-aws-dynamo.js');
} else {
  exports.driver = require('../data/db-memory.js');
}
