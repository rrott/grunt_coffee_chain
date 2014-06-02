#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('tmp')

  proceed: (options) ->
    @temp.tmpName(
      mode: 644
      prefix: 'coffee-chain-'
      , (err, tmp) =>
        throw err if err
        this.initCompilation(options, tmp)
    )

  initCompilation: (options, tmp) ->
    for files in options
      @helper.checkFiles files
      this.compileAll files, tmp
      @grunt.file.copy(tmp, files.dest)

  compileAll: (files, tmp) ->
    for file in files.src
      this.compile file, tmp

  compile: (file, tmp) ->
    js = @snockets.getConcatenation file, {async: false}
    @grunt.file.write  tmp, js

