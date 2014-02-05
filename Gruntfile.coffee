#
# * grunt-coffee-chain
# * https://github.com/rrott/grunt_coffee_chain
# *
# * Copyright (c) 2014 Roman Rott (rrott)
# * Licensed under the MIT license.
#
'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    clean:
      tests:   ['tmp']
      scripts: ['tasks/', 'Gruntfile.js']

    coffeeChain:
      compile:
        src:  'src/coffee_chain.coffee'
        dest: 'tasks/coffee_chain.js'
      default_options:
        src: 'test/fixtures/default_options.coffee'
        dest: 'tmp/default_options.js'
      #custom_options:
      #  src: 'test/fixtures/default_options.coffee'
      #  dest: 'tmp/custom_options.js'
      tests:
        dest: 'test/compiled/coffee_chain.spec.js'
        src:  'test/src/coffee_chain.spec.coffee'
      gruntfile:
        dest: 'Gruntfile.js'
        src:  'Gruntfile.coffee'

    nodeunit:
      tests: ['test/compiled/coffee_chain.spec.js']


  grunt.loadTasks 'tasks'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'
  grunt.loadNpmTasks 'grunt-coffee-chain'

  grunt.registerTask 'compile',   [ 'clean:scripts', 'coffeeChain:compile',   'coffeeChain:gruntfile', 'cleanTest']
  grunt.registerTask 'cleanTest', [ 'clean:tests',  'coffeeChain:tests']
  grunt.registerTask 'test',      [ 'coffeeChain:default_options', 'nodeunit']

  grunt.registerTask 'default', ['compile']
