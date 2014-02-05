(function() {
  root.Helpers = (function() {
    function Helpers(options) {
      this.grunt = options.grunt;
    }

    Helpers.prototype.validateFiles = function(filepath) {
      var file_exists;
      file_exists = this.grunt.file.exists(filepath);
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
    function Compiler() {
      this.snockets = new (require("snockets"))();
      this.path = require("path");
    }

    Compiler.prototype.initialize = function(options) {
      this.grunt = options.grunt;
      this.files = options.files;
      return this.helper = new root.Helper(options);
    };

    Compiler.prototype.proceed = function(options) {
      var file, _i, _len, _ref, _results;
      this.initialize(options);
      this.helper.isAvaliable(this.files.length);
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.prepareList(file));
      }
      return _results;
    };

    Compiler.prototype.prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      this.helper.isAvaliable(this.files.dest);
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
      return compiler.proceed(options);
    });
  };

}).call(this);
