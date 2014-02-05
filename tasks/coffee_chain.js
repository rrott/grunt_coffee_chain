(function() {
  "use strict";
  module.exports = function(grunt) {
    var compile, isAvaliable, path, prepareList, proceed, showError, snockets, validateFiles;
    snockets = new (require("snockets"))();
    path = require("path");
    grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options();
      return proceed(this.files, options);
    });
    proceed = function(files, options) {
      var file, _i, _len, _results;
      isAvaliable(files.length);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(prepareList(file));
      }
      return _results;
    };
    prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      isAvaliable(files.dest);
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(compile(file, files.dest));
      }
      return _results;
    };
    compile = function(file, dest) {
      var js;
      js = snockets.getConcatenation(file, {
        async: false
      });
      return grunt.file.write(path.resolve(dest), js);
    };
    validateFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };
    isAvaliable = function(avaliable) {
      if (!avaliable) {
        showError("You should provide existant files in the Gruntfile");
        return avaliable;
      }
    };
    return showError = function(error) {
      return grunt.log.error(error);
    };
  };

}).call(this);
