"use strict"
exports.init = (grunt) ->
  exports = {}
  helper   = require('./helpers').init(grunt)
  snockets = new (require("snockets"))()
  path     = require("path")

  exports.proceed = (files, options) ->
    helper.isAvaliable files.length
    for file in files
      this.prepareList file

  exports.prepareList = (files) ->
    helper.isAvaliable files.dest
    for file in files.src
      this.compile file, files.dest

  exports.compile = (file, dest) ->
    js = snockets.getConcatenation(
      file
      async: false
    )

    grunt.file.write path.resolve(dest), js

  exports
