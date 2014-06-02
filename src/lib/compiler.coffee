#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('tmp')

  proceed: (options) ->
    @temp.tmpName(
      prefix: 'coffee-chain-'
      , (err, tmp) =>
        throw err if err
        this._initCompilation(options, tmp)
    )

  _initCompilation: (options, tmp) ->
    for files in options
      @helper.checkFiles files
      this._compileAll files, tmp
    this._saveDestination(tmp, files.dest)

  _saveDestination: (tmp, dest) ->
    @grunt.file.copy(tmp, dest)

  _compileAll: (files, tmp) ->
    for file in files.src
      this._compile file, tmp

  _compile: (file, tmp) ->
    js = @snockets.getConcatenation file, {async: false}
    @grunt.file.write  tmp, js

