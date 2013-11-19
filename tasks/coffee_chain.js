(function() {
  "use strict";
  module.exports = function(grunt) {
    var fileFinder;
    fileFinder = require('./lib/file_finder').init(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        dest: 'dist',
        compile: false,
        clean: false,
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        separator: grunt.util.linefeed
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
          var params;
          src = grunt.file.read(filepath);
          params = {
            src: src,
            keyword: options.keyword,
            dirKeyword: options.dirKeyword,
            dest: f.dest
          };
          grunt.log.writeln("Files: ", filepath, fileFinder.requiredFiles(params));
          grunt.log.writeln("Dirs : ", filepath, fileFinder.requiredDirs(params));
          return src;
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