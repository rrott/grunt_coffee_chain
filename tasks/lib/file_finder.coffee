"use strict"
exports.init = (grunt) ->
  exports = {}

  exports.requiredFiles = (options) ->
    this.requiredThing('file', options)

  exports.requiredDirs = (options) ->
    this.requiredThing('folder', options)

  exports.requiredThing = (key, options) ->
    options = {}  unless options
    keyword = if key == "file" then options.keyword else options.dirKeyword
    this.generateList(keyword, key, options)

  exports.generateList = (keyword, key, options) ->
    re = this.searchRegexp(keyword)
    listOfFiles = []
    for line in options.src.split('\n')
      listOfFiles.push line.replace re, "$1" + this.extension(key) if line.match(re)

    listOfFiles

  exports.searchRegexp = (keyword) ->
    new RegExp("^"+keyword+"[ ](.*)$", "")

  exports.extension = (key) ->
    if key == "file" then '.js' else ""

  exports
