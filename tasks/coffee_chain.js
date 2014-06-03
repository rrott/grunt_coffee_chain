(function() {
  root.Messages = (function() {
    function Messages() {
      this.messages = {
        description: "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order",
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
      this.temp = require('temp').track();
    }

    Compiler.prototype.proceed = function(options) {
      this.options = options;
      return this.temp.open("coffee-chain-", (function(_this) {
        return function(err, tmp) {
          var files, _i, _len, _ref, _results;
          if (err) {
            throw err;
          }
          _ref = _this.options;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            files = _ref[_i];
            _this.helper.checkFiles(files);
            _results.push(_this._compileAll(files, tmp.path));
          }
          return _results;
        };
      })(this));
    };

    Compiler.prototype._saveDestination = function(tmp, dest) {
      return this.grunt.file.copy(tmp, dest);
    };

    Compiler.prototype._compileAll = function(files, tmp) {
      var file, _i, _len, _ref;
      _ref = files.src;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        this._compile(file, tmp);
      }
      return this._saveDestination(tmp, files.dest);
    };

    Compiler.prototype._compile = function(file, tmp) {
      var js;
      js = this.snockets.getConcatenation(file, {
        async: false
      });
      return this.grunt.file.write(tmp, js);
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
