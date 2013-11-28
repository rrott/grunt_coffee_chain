(function() {
  root.Helpers = (function() {
    function Helpers() {}

    Helpers.prototype.isAvaliable = function(avaliable) {
      if (!avaliable) {
        this.showError("You should provide existant files in the Gruntfile");
        return avaliable;
      }
    };

    Helpers.prototype.showError = function(error) {
      return grunt.log.error(error);
    };

    return Helpers;

  })();

}).call(this);

(function() {
  root.Compiler = (function() {
    function Compiler(options) {
      this.snockets = new (require("snockets"))();
      this.helper = new root.Helpers();
      this.path = require("path");
      this.options = options;
    }

    Compiler.prototype.compileFile = function(file, dest) {
      var result;
      result = this.snockets.getConcatenation(file, {
        async: false,
        minify: this.options.minify
      });
      return this.writeToFile(dest, result);
    };

    Compiler.prototype.compile = function(files) {
      var file, _i, _len, _ref, _results;
      this.helper.isAvaliable(files.dest);
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compileFile(file, files.dest));
      }
      return _results;
    };

    Compiler.prototype.writeToFile = function(file, result) {
      return this.options.grunt.file.write(this.path.resolve(file), result);
    };

    return Compiler;

  })();

}).call(this);

(function() {
  "use strict";
  root.Starter = (function() {
    function Starter() {}

    Starter.prototype.proceed = function(files, options) {
      var file, _i, _len, _results;
      this.helper = new root.Helpers();
      this.compiler = new root.Compiler(options);
      this.helper.isAvaliable(files.length);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.compiler.compile(file));
      }
      return _results;
    };

    return Starter;

  })();

  module.exports = function(grunt) {
    var starter;
    starter = new root.Starter();
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        minify: false,
        grunt: grunt
      });
      return starter.proceed(this.files, options);
    });
  };

}).call(this);
