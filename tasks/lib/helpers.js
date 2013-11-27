(function() {
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
//@ sourceMappingURL=helpers.js.map
*/