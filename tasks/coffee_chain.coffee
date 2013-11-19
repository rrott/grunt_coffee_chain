"use strict"
module.exports = (grunt) ->
  fileFinder = require('./lib/file_finder').init(grunt);

  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    options =  @options(
      keyword:    '#= require'
      dirKeyword: '#= require_tree'
      extension:  '.coffee'
      separator:  grunt.util.linefeed

    )

    fileFinder.searchFiles(@files, options)
