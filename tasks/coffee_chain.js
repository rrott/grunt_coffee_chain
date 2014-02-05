(function() {
  root.Helpers = (function() {
    function Helpers(options) {
      this.grunt = options.grunt;
    }

    Helpers.prototype.validateFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        this.grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };

    Helpers.prototype.isAvaliable = function(avaliable) {
      if (!avaliable) {
        this.showError("You should provide existant files in the Gruntfile");
        return avaliable;
      }
    };

    Helpers.prototype.showError = function(error) {
      return this.grunt.log.error(error);
    };

    return Helpers;

  })();

}).call(this);

(function() {
  root.Compiler = (function() {
    function Compiler() {}

    Compiler.prototype.initialize = function(options) {
      console.log('tt');
      this.snockets = new (require("snockets"))();
      this.helper = new root.Helper(options);
      this.path = require("path");
      this.grunt = options.grunt;
      return this.files = options.files;
    };

    Compiler.prototype.proceed = function() {
      var file, _i, _len, _results;
      console.log('files');
      this.helper.isAvaliable(files.length);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.prepareList(file));
      }
      return _results;
    };

    Compiler.prototype.prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      this.helper.isAvaliable(files.dest);
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compile(file, this.files.dest));
      }
      return _results;
    };

    Compiler.prototype.compile = function(file, dest) {
      var js;
      js = this.snockets.getConcatenation(file, {
        async: false
      });
      return this.grunt.file.write(this.path.resolve(dest), js);
    };

    return Compiler;

  })();

}).call(this);

(function() {
  "use strict";
  module.exports = function(grunt) {
    var compiler;
    compiler = new root.Compiler();
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        grunt: grunt,
        files: this.files
      });
      compiler.initialize(options);
      compiler.proceed();
      return console.log('test');
    });
  };

}).call(this);
