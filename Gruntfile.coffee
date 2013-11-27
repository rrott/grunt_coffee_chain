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
    coffeeChain:
      #custom_options:
      #  options: {}
      #    keyword:    '#= require'
      #    dirKeyword: '#= require_tree'
      #    extension:  '.js.coffee'
      #  files:
      #    "tmp/default_options": ["test/fixtures/testing", "test/fixtures/123"]

      default_options:
        src: "test/fixtures/default_options.coffee"
        dest: "tmp/default_options.js"

    # Unit tests.
    nodeunit:
      tests: ["test/*_test.js"]

    coffee:
      options:
        sourceMap: true
      compile:
        files: [
          'tasks/coffee_chain.js': 'tasks/coffee_chain.coffee'
          'tasks/lib/compiler.js': 'tasks/lib/compiler.coffee'
          'tasks/lib/helpers.js': 'tasks/lib/helpers.coffee'
        ]
      test:
        files:
          'test/coffee_chain_test.js': 'test/coffee_chain_test.coffee'
      grunt:
        options:
          sourceMap: false
        files:
          'Gruntfile.js': 'Gruntfile.coffee'

  # Actually load this plugin's task(s).
  grunt.loadTasks "tasks"

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-nodeunit"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  #grunt.loadNpmTasks "grunt-shell"

  # Whenever the "test" task is run, first clean the "tmp" dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask "test", ["clean", "coffee", "coffeeChain", "nodeunit"]

  # By default, lint and run all tests.
  grunt.registerTask "default", ["coffee",  "test"]
