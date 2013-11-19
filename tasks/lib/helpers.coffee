"use strict"
exports.init = (grunt) ->
  exports = {}

  exports.validateFiles = (filepath)->
    file_exists = grunt.file.exists(filepath)
    if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
    file_exists

  exports.pathToFolder = (filepath) ->
    re = new RegExp("^(.*)[/][^/]*$", "")
    filepath.replace re, "$1" + "/"

  exports.searchRegexp = (keyword) ->
    new RegExp("^"+keyword+"[ ](.*)$", "")

  exports.getValidPathes = (file) ->
    file.src.filter( (filepath) =>
      this.validateFiles(filepath)
    )

  exports.extension = (key, extension) ->
    if key == "file" then extension else "*"+extension

  exports
