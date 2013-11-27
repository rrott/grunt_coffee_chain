"use strict"
grunt = require("grunt")

exports.coffeeChain =
  setUp: (done) ->

    # setup here if necessary
    done()

  default_options: (test) ->
    test.expect 1
    actual = grunt.file.read("tmp/default_options.js")
    expected = grunt.file.read("test/expected/default_options.js")
    test.equal actual, expected, "should concatinate and compile files"
    test.done()

  default_options_with_mask: (test) ->
    #test.expect 1
    #actual = grunt.file.read("tmp/default_options.coffee")
    #expected = grunt.file.read("test/expected/default_options")
    #test.equal actual, expected, "should concatinate the files that are provided as a mask"
    test.done()

  #custom_options: (test) ->
  #  test.expect 1
  #  actual = grunt.file.read("tmp/custom_options")
  #  expected = grunt.file.read("test/expected/custom_options")
  #  test.equal actual, expected, "should describe what the custom option(s) behavior is."
  #  test.done()
