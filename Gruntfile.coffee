#
# * grunt-coffee-chain
# * https://github.com/rrott/grunt_coffee_chain
# *
# * Copyright (c) 2013 Roman Rott (rrott)
# * Licensed under the MIT license.
#
"use strict"
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    # Before generating any new files, remove any previously-created files.
    clean:
      tests: ["tmp"]

    # Unit tests.
    nodeunit:
      tests: ["test/*_test.js"]

    #renamer:

    coffeeChain:
      #will compile itself to itself
      compile:
        src:  'tasks/coffee_chain.coffee'
        dest: 'tasks/coffee_chain.js'
      test:
        src: 'test/coffee_chain_test.coffee'
        dest: 'test/coffee_chain_test.js'

      # Configuration to be run (and then tested).
      default_options:
        src: "test/fixtures/default_options.coffee"
        dest: "tmp/default_options.js"
      custom_options:
        options:
          minify: true
        src: "test/fixtures/default_options.coffee"
        dest: "tmp/custom_options.js"

  # Actually load this plugin's task(s).
  grunt.loadTasks "tasks"

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-nodeunit"
  grunt.loadNpmTasks "grunt-coffee-chain"

  # Whenever the "test" task is run, first clean the "tmp" dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask "test", ["clean", "coffeeChain", "nodeunit"]

  # By default, lint and run all tests.
  grunt.registerTask "default", ["coffeeChain",  "test"]
