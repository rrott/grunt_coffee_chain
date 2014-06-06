# gruntfile used to compile tests and coffee-chain script
# using previous version of coffee-chain got from npm

'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    clean:
      tests:   ['test/compiled/']
      tasks:   ['tasks/']
    coffeeChain:
      tasks:
        src:  'src/coffee_chain.coffee',
        dest: 'tasks/coffee_chain.js'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-coffee-chain'

  grunt.registerTask 'default', ['clean', 'coffeeChain']
