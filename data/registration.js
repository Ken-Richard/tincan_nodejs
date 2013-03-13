var registrations = {};

exports.generateTestData = function() {
  registrations['b9855f24-2140-4fb8-931d-2a37cf412c2e'] = Object.new;
};

exports.find = function(id) {
  return registrations[id];
};


