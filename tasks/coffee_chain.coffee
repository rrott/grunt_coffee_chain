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

    @files.forEach (f) ->
      src = f.src.filter((filepath) ->
        validFiles(filepath)
      ).map((filepath) ->
        generateList(filepath, f.dest, options)
      ).join(options.separator)

  validFiles = (filepath)->
    file_exists = grunt.file.exists(filepath)
    if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
    file_exists

  generateList = (filepath, dest, options) ->
    params =
      src:        grunt.file.read(filepath)
      keyword:    options.keyword
      dirKeyword: options.dirKeyword
      extension:  options.extension
      dest:       pathToFolder(filepath)

    grunt.log.writeln "Files: ", filepath, fileFinder.requiredFiles( params )
    grunt.log.writeln "Dirs : ", filepath, fileFinder.requiredDirs(  params )

  pathToFolder = (filepath)->
    re = new RegExp("^(.*)[/][^/]*$", "")
    filepath.replace re, "$1" + "/"

