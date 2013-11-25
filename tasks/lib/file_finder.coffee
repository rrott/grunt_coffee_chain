"use strict"
exports.init = (grunt) ->
  exports = {}
  helper = require('./helpers').init(grunt)

  exports.searchFiles = (files, options) ->
    #console.log  files
    for file in files
      console.log file.src
      for filepath in helper.getValidPathes(file)
        this.prepareList(filepath, options)

  exports.prepareList = (filepath, options) ->
    options.src  = grunt.file.read(filepath)
    options.dest = helper.pathToFolder(filepath)

    console.log "new\n", [
      {
        src: this.requiredFiles('file', options )
        dest: filepath
        orig: {
          src:  this.requiredFiles('file', options ),
          dest: filepath
        }
      }
    ]
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
