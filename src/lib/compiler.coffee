#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require "snockets" )()
    @helper   = new root.Helper(@grunt)
    @temp     = require('temp')
    @fs       = require 'fs'

  proceed: (files) ->
    for file in files
      @helper.checkFiles(file)
      this.prepareList file

  prepareList: (files) =>
    @temp.open "coffee_chain", (err, tmp) =>
      unless err
        for file in files.src
          this.compile file, tmp.path
        console.log tmp.path
        @fs.renameSync(tmp.path, files.dest)

  compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write dest, js

