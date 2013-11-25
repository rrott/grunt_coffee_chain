(function() {
  "use strict";
  module.exports = function(grunt) {
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      return options = this.options({
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        extension: '.coffee',
        separator: grunt.util.linefeed
      });
    });
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/