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
    default_options_with_mask: function(test) {
      return test.done();
    }
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain_test.js.map
*/