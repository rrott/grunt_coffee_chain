#TODO: rewrite these coffee scripts to use coffee_chain in head of this plugin
"use strict"
module.exports = (grunt) ->
  compiler = require('./lib/compiler').init(grunt)

  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    options =  @options(
      keyword:    '#= require'
      dirKeyword: '#= require_tree'
      extension:  '.coffee'
      separator:  grunt.util.linefeed

    )

    compiler.proceed(@files, options)

