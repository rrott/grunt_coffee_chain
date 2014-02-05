#= require ./messages

class root.Helper
  constructor: (grunt) ->
    @grunt = grunt
    @messages = new root.Messages()

  isAvaliable: (avaliable) ->
    if not avaliable
      this.showError()

  checkFiles: (files) ->
    this._checkFile files.src
    this._checkFile files.dest

  showError: ->
    @grunt.warn @messages.text('missed_param')

  _checkFile: (files) ->
    if files?  then  this.isAvaliable files.length  else this.showError()
