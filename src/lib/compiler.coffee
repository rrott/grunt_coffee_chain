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
        @helper.checkFiles files
        this._compileAll(
          files
          tmp.path
          =>
            @grunt.file.copy tmp.path, files.dest
            @options.done()
        )

  _compileAll: (files, tmp, callback) ->
    for file in files.src
      this._compile file, tmp
    callback() if callback

  _compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write dest, js




