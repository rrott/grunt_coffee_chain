(function() {
  "use strict";
  module.exports = function(grunt) {
    var fileFinder, generateList, pathToFolder, validFiles;
    fileFinder = require('./lib/file_finder').init(grunt);
    grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        extension: '.coffee',
        separator: grunt.util.linefeed
      });
      return this.files.forEach(function(f) {
        var src;
        return src = f.src.filter(function(filepath) {
          return validFiles(filepath);
        }).map(function(filepath) {
          generateList(filepath, f.dest, options);
          return grunt.file.read(filepath);
        }).join(options.separator);
      });
    });
    validFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };
    generateList = function(filepath, dest, options) {
      var params;
      params = {
        src: grunt.file.read(filepath),
        keyword: options.keyword,
        dirKeyword: options.dirKeyword,
        extension: options.extension,
        dest: dest
      };
      grunt.log.writeln("Files: ", pathToFolder(filepath), fileFinder.requiredFiles(params));
      return grunt.log.writeln("Dirs : ", pathToFolder(filepath), fileFinder.requiredDirs(params));
    };
    return pathToFolder = function(filepath) {
      var re;
      re = new RegExp("^(.*)[/][^/]*$", "");
      return filepath.replace(re, "$1");
    };
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/