"use strict"
#= require ./lib/compiler

class root.Starter
  proceed: (files, options) ->
    @helper = new root.Helpers()
    @compiler = new root.Compiler(options)
    @helper.isAvaliable files.length
    for file in files
      @compiler.compile file

module.exports = (grunt) ->
  starter = new root.Starter()
  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    options =  @options(
      minify:     false
      grunt:      grunt
    )
    starter.proceed(@files, options)
