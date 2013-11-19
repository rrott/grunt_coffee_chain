"use strict"
module.exports = (grunt) ->
  #compiler = require('./lib/compiler').init(grunt);

  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    # Merge task-specific and/or target-specific options with these defaults.
    options =  @options(
      dest:           'dist'
      staging:        'tmp'
      src:            'app'
      compile:        false
      clean:          false
      separator:      grunt.util.linefeed
      reqKeyword:    '#= require'
      reqDirKeyword: '#= require_tree'
    )

    @files.forEach (f) ->
      src = f.src.filter((filepath) ->
        file_exists = grunt.file.exists(filepath)
        if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
        file_exists
      ).map((filepath) ->
        grunt.file.read(filepath)
      ).join(options.separator)

      grunt.file.write f.dest, src
      grunt.log.writeln "File \"" + f.dest + "\" created."

