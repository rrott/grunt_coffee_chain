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
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root.Compiler = (function() {
    function Compiler(grunt) {
      this.proceed = __bind(this.proceed, this);
      this.grunt = grunt;
      this.snockets = new (require("snockets"))();
      this.helper = new root.Helper(this.grunt);
      this.temp = require('tmp');
    }

    Compiler.prototype.proceed = function(options) {
      var _this = this;
      return this.temp.tmpName({
        mode: 644,
        prefix: 'coffee-chain-',
        postfix: '.txt'
      }, function(err, path, fd) {
        var files, _i, _len, _results;
        if (err) {
          throw err;
        }
        _results = [];
        for (_i = 0, _len = options.length; _i < _len; _i++) {
          files = options[_i];
          _this.helper.checkFiles(files);
          _this.prepareList(files, path);
          _results.push(_this.grunt.file.copy(path, files.dest));
        }
        return _results;
      });
    };

    Compiler.prototype.prepareList = function(files, tmp) {
      var file, _i, _len, _ref, _results;
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compile(file, tmp));
      }
      return _results;
    };

    Compiler.prototype.compile = function(file, tmp) {
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
