# gruntfile used to compile tests and coffee-chain script
# using previous version of coffee-chain got from npm

'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    clean:
      tests:   ['test/compiled/']
      tasks:   ['dist/']
    coffeeChain:
      tests:
        src:  'test/src/coffee_chain.spec.coffee'
        dest: 'test/compiled/coffee_chain.spec.js'
      tasks:
        src:  'src/coffee_chain.coffee',
        dest: 'dist/coffee_chain.js'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadTasks('tasks');

  grunt.registerTask 'default', ['clean', 'coffeeChain']
