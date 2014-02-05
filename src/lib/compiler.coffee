#= require ./helpers
class root.Compiler
  initialize: (options) ->
    console.log 'tt'
    @snockets = new (require("snockets"))()
    @helper   = new root.Helper(options)
    @path     = require("path")
    @grunt    = options.grunt
    @files    = options.files

  proceed: ->
    console.log 'files'

    @helper.isAvaliable files.length
    for file in files
      this.prepareList file

  prepareList: (files) ->
    @helper.isAvaliable files.dest
    for file in files.src
      this.compile file, @files.dest

  compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write @path.resolve(dest), js

