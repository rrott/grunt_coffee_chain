/*
 * grunt-coffee-chain
 * https://github.com/rrott/grunt_coffee_chain
 *
 * Copyright (c) 2014 Roman Rott
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      tests: ['tmp']
    },
    coffeeChain: {
      tasks: {
        src:  'src/coffee_chain.coffee',
        dest: 'tmp/coffee_chain.js'
      },
      tests: {
        src:  'test/src/coffee_chain.spec.coffee',
        dest: 'test/compiled/coffee_chain.spec.js'
      },
      default_options: {
        src:  'test/fixtures/default_options.coffee',
        dest: 'tmp/default_options.js'
      },
      custom_options: {
        src:  'test/fixtures/custom_options.coffee',
        dest: 'tmp/custom_options.js'
      }
    },
    nodeunit: {
      tests: ['test/compiled/coffee_chain.spec.js']
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['clean', 'coffeeChain', 'nodeunit', 'clean']);

}