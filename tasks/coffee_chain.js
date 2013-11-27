(function() {
  "use strict";
  module.exports = function(grunt) {
    var compiler;
    compiler = require('./lib/compiler').init(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        extension: '.coffee',
        separator: grunt.util.linefeed
      });
      return compiler.proceed(this.files, options);
    });
  };

  "use strict";

  module.exports = function(grunt) {
    var compiler;
    compiler = require('./lib/compiler').init(grunt);
    return grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        extension: '.coffee',
        separator: grunt.util.linefeed
      });
      return compiler.proceed(this.files, options);
    });
  };

  "use strict";

  exports.init = function(grunt) {
    var exports, helper, path, snockets;
    exports = {};
    helper = require('./helpers').init(grunt);
    snockets = new (require("snockets"))();
    path = require("path");
    exports.proceed = function(files, options) {
      var file, _i, _len, _results;
      helper.isAvaliable(files.length);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.prepareList(file));
      }
      return _results;
    };
    exports.prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      helper.isAvaliable(files.dest);
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compile(file, files.dest));
      }
      return _results;
    };
    exports.compile = function(file, dest) {
      var js;
      js = snockets.getConcatenation(file, {
        async: false
      });
      return grunt.file.write(path.resolve(dest), js);
    };
    return exports;
  };

  "use strict";

  exports.init = function(grunt) {
    var exports;
    exports = {};
    exports.validateFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };
    exports.isAvaliable = function(avaliable) {
      if (!avaliable) {
        this.showError("You should provide existant files in the Gruntfile");
        return avaliable;
      }
    };
    exports.showError = function(error) {
      return grunt.log.error(error);
    };
    return exports;
  };

  "use strict";

  exports.init = function(grunt) {
    var exports, helper, path, snockets;
    exports = {};
    helper = require('./helpers').init(grunt);
    snockets = new (require("snockets"))();
    path = require("path");
    exports.proceed = function(files, options) {
      var file, _i, _len, _results;
      helper.isAvaliable(files.length);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.prepareList(file));
      }
      return _results;
    };
    exports.prepareList = function(files) {
      var file, _i, _len, _ref, _results;
      helper.isAvaliable(files.dest);
      _ref = files.src;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.compile(file, files.dest));
      }
      return _results;
    };
    exports.compile = function(file, dest) {
      var js;
      js = snockets.getConcatenation(file, {
        async: false
      });
      return grunt.file.write(path.resolve(dest), js);
    };
    return exports;
  };

  "use strict";

  exports.init = function(grunt) {
    var exports;
    exports = {};
    exports.validateFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };
    exports.isAvaliable = function(avaliable) {
      if (!avaliable) {
        this.showError("You should provide existant files in the Gruntfile");
        return avaliable;
      }
    };
    exports.showError = function(error) {
      return grunt.log.error(error);
    };
    return exports;
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/