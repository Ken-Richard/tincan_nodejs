//
// Dummy Registration Data - Generates Registrations
// as they are referenced.
//

var registrations = {};

createTestData = function(reg_id) {

  var reg = {};

  // Basic Fields
  reg.name = "Name";
  reg.email = "Email";
  reg.id = reg_id;

  // States
  reg.state = {};

  // Statements
  reg.statements = {};

  // Hash It!
  registrations[reg_id] = reg;

  // Done
  return reg;
};

exports.find = function(id) {
  var reg = registrations[id];
  if (reg==null) {
    reg = createTestData(id);
  }
  return reg;
};

exports.all = registrations;


