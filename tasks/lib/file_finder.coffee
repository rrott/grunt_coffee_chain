"use strict"
exports.init = (grunt) ->
  exports = {}
  helper = require('./helpers').init(grunt)

  exports.searchFiles = (files, options) ->
    #console.log  files
    listOfFiles = []
    for file in files
      for filepath in helper.getValidPathes(file)
        console.log  this.prepareList(filepath, options)
    console.log listOfFiles

  exports.prepareList = (filepath, options) ->
    options.src  = grunt.file.read(filepath)
    options.dest = helper.pathToFolder(filepath)
    files = this.requiredFiles('file', options )
    if files.length
      this.searchFiles(
        [
          {
            src: files
            dest: filepath
            orig: {
              src: files
              dest: filepath
            }
          }
        ]
        options
      )
    #grunt.log.writeln "Dirs : ", filepath, this.requiredFiles('dirs', options )

#[ { src: [Getter],
#    dest: 'tmp/default_options.coffee',
#    orig: { src: [Object], dest: 'tmp/default_options.coffee' } } ]

  exports.requiredFiles = (key, options) ->
    keyword = if key == "file" then options.keyword else options.dirKeyword
    this.generateList(keyword, key, options)

  exports.generateList = (keyword, key, options) ->
    re = helper.searchRegexp(keyword)
    listOfFiles = []
    for line in options.src.split('\n')
      if line.match re
        listOfFiles.push line.replace re, options.dest + "$1" + helper.extension(key, options.extension)
    listOfFiles

  exports
