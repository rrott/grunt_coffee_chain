(function() {
  root.Messages = (function() {
    function Messages() {
      this.messages = {
        missed_param: 'You should provide "src" and "dest" params in the Gruntfile'
      };
    }

    Messages.prototype.text = function(text) {
      return this.messages[text];
    };

    return Messages;

  })();

}).call(this);

(function() {
  root.Helper = (function() {
    function Helper(grunt) {
      this.grunt = grunt;
      this.messages = new root.Messages();
    }

    Helper.prototype.isAvaliable = function(avaliable) {
      if (!avaliable) {
        return this.showError();
      }
    };

    Helper.prototype.checkFiles = function(files) {
      this._checkFile(files.src);
      return this._checkFile(files.dest);
    };

    Helper.prototype.showError = function() {
      return this.grunt.warn(this.messages.text('missed_param'));
    };

    Helper.prototype._checkFile = function(files) {
      if (files != null) {
        return this.isAvaliable(files.length);
      } else {
        return this.showError();
      }
    };

    return Helper;

  })();

}).call(this);

(function() {
  root.Compiler = (function() {
    function Compiler(grunt) {
      this.grunt = grunt;
      this.snockets = new (require("snockets"))();
      this.helper = new root.Helper(this.grunt);
    }

    Compiler.prototype.proceed = function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        this.helper.checkFiles(file);
        _results.push(this.prepareList(file));
      }
      return _results;
    };

    Compiler.prototype.prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compile(file, files.dest));
      }
      return _results;
    };

    Compiler.prototype.compile = function(file, dest) {
      var js;
      js = this.snockets.getConcatenation(file, {
        async: false
      });
      return this.grunt.file.write(dest, js);
    };

    return Compiler;

  })();

}).call(this);

(function() {
  module.exports = function(grunt) {
    var compiler;
    compiler = new root.Compiler(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      return compiler.proceed(this.files);
    });
  };

}).call(this);
