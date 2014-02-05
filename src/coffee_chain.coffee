"use strict"
#TODO: rewrite these coffee scripts to use coffee_chain in head of this plugin
module.exports = (grunt) ->
  snockets = new (require("snockets"))()
  path     = require("path")
  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    options =  @options()

    proceed(@files, options)

  proceed = (files, options) ->
    isAvaliable files.length
    for file in files
      prepareList file

  prepareList = (files) ->
    isAvaliable files.dest
    for file in files.src
      compile file, files.dest

  compile = (file, dest) ->
    js = snockets.getConcatenation(
      file
      async: false
    )

    grunt.file.write path.resolve(dest), js

  validateFiles = (filepath)->
    file_exists = grunt.file.exists(filepath)
    if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
    file_exists

  isAvaliable = (avaliable) ->
    if not avaliable
      showError "You should provide existant files in the Gruntfile"
      avaliable

  showError = (error) ->
    grunt.log.error error



#= require ./lib/compiler

#class root.Starter
#  proceed: (files, options) ->
#    @helper = new root.Helpers()
#    @compiler = new root.Compiler(options)
#    @helper.isAvaliable files.length
#    for file in files
#      @compiler.compile file

#module.exports = (grunt) ->
#  starter = new root.Starter()
#  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
#    options =  @options(
#      minify:     false
#      grunt:      grunt
#    )
#    starter.proceed(@files, options)
