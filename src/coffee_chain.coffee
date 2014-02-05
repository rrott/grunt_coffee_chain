"use strict"
#= require ./lib/compiler

module.exports = (grunt) ->
  compiler = new root.Compiler()
  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    options =  @options(
      grunt:   grunt
      files:   @files
    )
    compiler.initialize(options)
    compiler.proceed()






