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
      actual = grunt.file.read("tmp/default_options.coffee");
      expected = grunt.file.read("test/expected/default_options");
      test.equal(actual, expected, "should concatinate the files");
      return test.done();
    },
    default_options_with_mask: function(test) {
      var actual, expected;
      test.expect(1);
      actual = grunt.file.read("tmp/default_options.coffee");
      expected = grunt.file.read("test/expected/default_options");
      test.equal(actual, expected, "should concatinate the files that are provided as a mask");
      return test.done();
    }
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain_test.js.map
*/