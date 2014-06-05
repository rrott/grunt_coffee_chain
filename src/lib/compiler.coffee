#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('temp').track()

  proceed: (options) ->
    @options = options
    for files in @options
      @temp.open "coffee-chain-", (err, tmp) =>
        throw err if err
        @helper.checkFiles files
        this._compileAll files, tmp.path, =>
          this._saveDestination(files.dest, tmp.path)

  _compileAll: (files, tmp, callback) ->
    for file in files.src
      this._compile file, tmp
    callback() if callback

  _saveDestination: (dest, tmp) ->
    @grunt.file.copy(tmp, dest)

  _compile: (file, tmp) ->
    js = @snockets.getConcatenation file, {async: false}
    @grunt.file.write  tmp, js

