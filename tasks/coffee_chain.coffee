"use strict"
module.exports = (grunt) ->
  fileFinder = require('./lib/file_finder').init(grunt);

  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    # Merge task-specific and/or target-specific options with these defaults.
    options =  @options(
      dest:      'dist'
      compile:    false
      clean:      false
      keyword:    '#= require'
      dirKeyword: '#= require_tree'
      separator:      grunt.util.linefeed
    )

    @files.forEach (f) ->
      src = f.src.filter((filepath) ->
        file_exists = grunt.file.exists(filepath)
        if not file_exists then grunt.log.warn "Source file \"" + filepath + "\" not found."
        file_exists
      ).map((filepath) ->
        src = grunt.file.read(filepath)
        params =
          src:      src
          keyword:  options.keyword
          dirKeyword:  options.dirKeyword
          dest: f.dest

        grunt.log.writeln "Files: ", filepath, fileFinder.requiredFiles( params )
        grunt.log.writeln "Dirs : ", filepath, fileFinder.requiredDirs(  params )

        src
      ).join(options.separator)

      #Write the destination file.
      grunt.file.write f.dest, src
      grunt.log.writeln "File \"" + f.dest + "\" created."
