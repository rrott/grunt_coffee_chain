(function() {
  "use strict";
  module.exports = function(grunt) {
    var fileFinder;
    fileFinder = require('./lib/file_finder').init(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        extension: '.coffee',
        separator: grunt.util.linefeed
      });
      return fileFinder.searchFiles(this.files, options);
    });
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/