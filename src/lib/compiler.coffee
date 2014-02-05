#= require ./helper
class root.Compiler
  constructor: (grunt) ->
    @grunt    = grunt
    @snockets = new (require("snockets"))()
    @helper   = new root.Helper(@grunt)

  proceed: (files) ->
    for file in files
      @helper.checkFiles(file)
      this.prepareList file

  prepareList: (files) ->
    for file in files.src
      this.compile file, files.dest

  compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write dest, js

