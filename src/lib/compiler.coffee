#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('tmp')

  proceed: (options) =>
    @temp.tmpName  { mode: 644, prefix: 'coffee-chain-', postfix: '.txt' }, (err, path, fd) =>
      throw err if err
      for files in options
        @helper.checkFiles files
        this.prepareList files, path
        @grunt.file.copy(path, files.dest)

  prepareList: (files, tmp) ->
    for file in files.src
      this.compile file, tmp

  compile: (file, tmp) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write  tmp, js

