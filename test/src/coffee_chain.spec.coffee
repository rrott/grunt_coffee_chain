"use strict"
grunt = require("grunt")

exports.coffeeChain =
  setUp: (done) ->

    # setup here if necessary
    done()

  tasks: (test) ->
    test.expect 1
    actual = grunt.file.read("tmp/coffee_chain.js")
    expected = grunt.file.read("tasks/coffee_chain.js")
    test.equal actual, expected, "should result the same script as previous version results"
    test.done()

  default_options: (test) ->
    test.expect 1
    actual = grunt.file.read("tmp/default_options.js")
    expected = grunt.file.read("test/expected/default_options.js")
    test.equal actual, expected, "should concatinate and compile with default options"
    test.done()

  custom_options: (test) ->
    test.expect 1
    actual = grunt.file.read("tmp/custom_options.js")
    expected = grunt.file.read("test/expected/custom_options.js")
    test.equal actual, expected, "should concatinate and compile with custom options"
    test.done()
