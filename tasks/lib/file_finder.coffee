"use strict"
exports.init = (grunt) ->
  exports = {}
  helper = require('./helpers').init(grunt)

  exports.searchFiles = (files, options) ->
    for file in files
      for filepath in helper.getValidPathes(file)
        this.prepareList(filepath, options)

  exports.prepareList = (filepath, options) ->
    options.src  = grunt.file.read(filepath)
    options.dest = helper.pathToFolder(filepath)

    grunt.log.writeln "Files: ", filepath, this.requiredFiles('file', options )
    grunt.log.writeln "Dirs : ", filepath, this.requiredFiles('dirs', options )

  exports.requiredFiles = (key, options) ->
    keyword = if key == "file" then options.keyword else options.dirKeyword
    this.generateList(keyword, key, options)

  exports.generateList = (keyword, key, options) ->
    re = helper.searchRegexp(keyword)
    listOfFiles = []
    for line in options.src.split('\n')
      if line.match(re)
        listOfFiles.push line.replace re, options.dest + "$1" + helper.extension(key, options.extension)
    listOfFiles

  exports
