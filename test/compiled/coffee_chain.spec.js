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
      actual = grunt.file.read("tmp/default_options.js");
      expected = grunt.file.read("test/expected/default_options.js");
      test.equal(actual, expected, "should concatinate and compile with default options");
      return test.done();
    },
    custom_options: function(test) {
      var actual, expected;
      test.expect(1);
      actual = grunt.file.read("tmp/custom_options.js");
      expected = grunt.file.read("test/expected/custom_options.js");
      test.equal(actual, expected, "should concatinate and compile with custom options");
      return test.done();
    }
  };

}).call(this);
