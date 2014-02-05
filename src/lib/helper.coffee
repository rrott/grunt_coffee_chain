class root.Helper
  constructor: (grunt) ->
    @grunt = grunt

  isAvaliable: (avaliable) ->
    if not avaliable
      this.showError()

  checkFiles: (files) ->
    this._checkFile files.src
    this._checkFile files.dest

  showError: ->
    @grunt.warn 'You should provide "src" and "dest" params in the Gruntfile'

  _checkFile: (files) ->
    if files?  then  this.isAvaliable files.length  else this.showError()
