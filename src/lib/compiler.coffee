#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('temp').track()

  proceed: (options) ->
    @options = options
    @temp.open "coffee-chain-", (err, tmp) =>
      throw err if err
      for files in @options
        @helper.checkFiles files
        this._compileAll files, tmp.path

  _saveDestination: (dest, tmp) ->
    @grunt.file.copy(tmp, dest)

  _compileAll: (files, tmp) ->
    for file in files.src
      this._compile file, tmp
    this._saveDestination(files.dest, tmp)

  _compile: (file, tmp) ->
    js = @snockets.getConcatenation file, {async: false}
    @grunt.file.write  tmp, js

