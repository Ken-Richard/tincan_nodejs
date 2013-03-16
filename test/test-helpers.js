//
// A few test cases to check the helpers
//

var should = require('should');
var client = require('./helpers/client.js');
var server = require('./helpers/server.js');
var db = require('../data/db-memory.js');

//server.start();

describe('Test Database', function() {

  describe('All Registrations', function() {

    var all;

    before(function(done) {
      all = db.allRegistrations();
      done();
    });

    it('should not be empty', function() {
      should.exist(all);
    });

  });



  describe('Load Registration', function() {

    var reg;

    before(function(done) {
      reg = db.loadRegistration('b9855f24-2140-4fb8-931d-2a37cf412c2e');
      done();
    });

    it('should not be empty', function() {
      should.exist(reg);
      reg.id.should.equal('b9855f24-2140-4fb8-931d-2a37cf412c2e')
    });

  });

});
