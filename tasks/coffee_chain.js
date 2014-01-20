(function() {
  "use strict";
  module.exports = function(grunt) {
    var compiler;
    compiler = require('./lib/compiler').init(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options();
      return compiler.proceed(this.files, options);
    });
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/