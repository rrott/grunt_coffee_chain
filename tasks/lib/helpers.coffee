"use strict"
exports.init = (grunt) ->
  exports = {}

  exports.validateFiles = (filepath)->
    file_exists = grunt.file.exists(filepath)
    if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
    file_exists

  exports.isAvaliable = (avaliable) ->
    if not avaliable
      this.showError "You should provide existant files in the Gruntfile"
      avaliable

  exports.showError = (error) ->
    grunt.log.error error

  exports
