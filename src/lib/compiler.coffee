#= require ./helpers
class root.Compiler
  constructor: (grunt) ->
    @snockets = new (require("snockets"))()
    @helper   = new root.Helper(@grunt)
    @path     = require("path")
    @grunt    = grunt

  proceed: (files) ->
    @helper.isAvaliable files.length
    for file in files
      this.prepareList file

  prepareList: (files) ->
    @helper.isAvaliable files.dest
    for file in files.src
      this.compile file, files.dest

  compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write @path.resolve(dest), js

