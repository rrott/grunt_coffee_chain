#= require ./helpers
class root.Compiler
  constructor: ->
    @snockets = new (require("snockets"))()
    @path     = require("path")

  initialize: (options) ->
    @grunt = options.grunt
    @files = options.files
    @helper   = new root.Helper(options)

  proceed: (options) ->
    this.initialize(options)
    @helper.isAvaliable @files.length
    for file in @files
      this.prepareList file

  prepareList: (files) ->
    @helper.isAvaliable @files.dest
    for file in files.src
      this.compile file, @files.dest

  compile: (file, dest) ->
    js = @snockets.getConcatenation(
      file
      async: false
    )

    @grunt.file.write @path.resolve(dest), js

