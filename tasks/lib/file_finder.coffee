"use strict"
exports.init = (grunt) ->
  exports = {}
  helper = require('./helpers').init(grunt)

  exports.searchFiles = (files, options) ->
    for file in files
      for filepath in helper.getValidPathes(file)
        this.prepareList(filepath, options)

  exports.prepareList = (filepath, options) ->
    params =
      src:        grunt.file.read(filepath)
      keyword:    options.keyword
      dirKeyword: options.dirKeyword
      extension:  options.extension
      dest:       helper.pathToFolder(filepath)

    grunt.log.writeln "Files: ", filepath, this.requiredFiles( 'file', params )
    grunt.log.writeln "Dirs : ", filepath, this.requiredFiles( 'dirs', params )

  exports.requiredFiles = (key, options) ->
    keyword = if key == "file" then options.keyword else options.dirKeyword
    this.generateList(keyword, key, options)

  exports.generateList = (keyword, key, options) ->
    re = helper.searchRegexp(keyword)
    listOfFiles = []
    for line in options.src.split('\n')
      listOfFiles.push line.replace re, options.dest + "$1" + this.extension(key, options.extension) if line.match(re)

    listOfFiles

  exports.extension = (key, extension) ->
    if key == "file" then extension else "*"+extension

  exports
