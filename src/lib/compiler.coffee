#= require ./helpers

#class root.Compiler
#  constructor: (options) ->
#    @snockets = new (require("snockets"))()
#    @helper   = new root.Helpers()
#    @path     = require("path")
#    @options  = options

#  compileFile: (file, dest) ->
#    result = @snockets.getConcatenation(
#      file
#      async: false
#      minify: @options.minify
#    )
#
#    this.writeToFile dest, result

#  compile: (files) ->
#    @helper.isAvaliable files.dest
#    for file in files.src
#      this.compileFile file, files.dest

#  writeToFile: (file, result) ->
#    @options.grunt.file.write(
#      @path.resolve file
#      result
#    )
