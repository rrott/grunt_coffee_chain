(function() {
  "use strict";
  var grunt;

  grunt = require("grunt");

  exports.coffeeChain = {
    setUp: function(done) {
      return done();
    },
    default_options: function(test) {
      return test.done();
    },
    custom_options: function(test) {
      return test.done();
    }
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain_test.js.map
*/