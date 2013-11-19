(function() {
  "use strict";
  module.exports = function(grunt) {
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        dest: 'dist',
        staging: 'tmp',
        src: 'app',
        compile: false,
        clean: false,
        separator: grunt.util.linefeed,
        reqKeyword: '#= require',
        reqDirKeyword: '#= require_tree'
      });
      return this.files.forEach(function(f) {
        var src;
        src = f.src.filter(function(filepath) {
          var file_exists;
          file_exists = grunt.file.exists(filepath);
          if (!file_exists) {
            grunt.log.warn("Source file \"" + filepath + "\" not found.");
          }
          return file_exists;
        }).map(function(filepath) {
          return grunt.file.read(filepath);
        }).join(options.separator);
        grunt.file.write(f.dest, src);
        return grunt.log.writeln("File \"" + f.dest + "\" created.");
      });
    });
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/