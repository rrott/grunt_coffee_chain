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
      var files, i, len, ref, results;
      this.options = options;
      ref = this.options;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        files = ref[i];
        results.push(this.temp.open("coffee-chain-", (function(_this) {
          return function(err, tmp) {
            _this.helper.checkFiles(files);
            return _this._compileAll(files, tmp.path, function() {
              _this.grunt.file.copy(tmp.path, files.dest);
              return _this.options.done();
            });
          };
        })(this)));
      }
      return results;
    };

    Compiler.prototype._compileAll = function(files, tmp, callback) {
      var file, i, len, ref;
      ref = files.src;
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        this._compile(file, tmp);
      }
      if (callback) {
        return callback();
      }
    };

    Compiler.prototype._compile = function(file, dest) {
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
      this.files.done = this.async();
      return compiler.proceed(this.files);
    });
  };

}).call(this);
