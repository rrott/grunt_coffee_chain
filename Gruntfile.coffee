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
    jshint:
      all: ["Gruntfile.js", "tasks/*.js", "<%= nodeunit.tests %>"]
      options:
        jshintrc: ".jshintrc"


    # Before generating any new files, remove any previously-created files.
    clean:
      tests: ["tmp"]


    # Configuration to be run (and then tested).
    coffee_chain:
      default_options:
        options: {}
        files:
          "tmp/default_options": ["test/fixtures/testing", "test/fixtures/123"]

      custom_options:
        options:
          separator: ": "
          punctuation: " !!!"

        files:
          "tmp/custom_options": ["test/fixtures/testing", "test/fixtures/123"]


    # Unit tests.
    nodeunit:
      tests: ["test/*_test.js"]

    coffee:
      options:
          sourceMap: true
      compile:
        files:
          'tasks/coffee_chain.js': 'tasks/*.coffee'
      test:
        files:
          'test/coffee_chain_test.js': 'test/coffee_chain_test.coffee'

  # Actually load this plugin's task(s).
  grunt.loadTasks "tasks"

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-nodeunit"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-shell"
  #grunt.loadNpmTasks 'grunt-concurrent'

  # Whenever the "test" task is run, first clean the "tmp" dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask "test", ["clean", "coffee", "coffee_chain", "nodeunit"]

  # By default, lint and run all tests.
  grunt.registerTask "default", ["coffee", "jshint", "test"]
