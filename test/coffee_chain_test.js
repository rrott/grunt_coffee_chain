(function() {
  "use strict";
  var grunt;

  grunt = require("grunt");

  exports.coffeeChain = {
    setUp: function(done) {
      return done();
    },
    default_options: function(test) {
      var actual, expected;
      test.expect(1);
      actual = grunt.file.read("tmp/default_options");
      expected = grunt.file.read("test/expected/default_options");
      test.equal(actual, expected, "should describe what the default behavior is.");
      return test.done();
    },
    custom_options: function(test) {
      var actual, expected;
      test.expect(1);
      actual = grunt.file.read("tmp/custom_options");
      expected = grunt.file.read("test/expected/custom_options");
      test.equal(actual, expected, "should describe what the custom option(s) behavior is.");
      return test.done();
    }
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain_test.js.map
*/