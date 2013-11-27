(function() {
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

}).call(this);

/*
//@ sourceMappingURL=compiler.js.map
*/