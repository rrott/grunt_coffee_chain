(function() {
  'use strict';
  module.exports = function(grunt) {
    grunt.initConfig({
      clean: {
        tests: ['tmp'],
        scripts: ['tasks/', 'Gruntfile.js']
      },
      coffeeChain: {
        compile: {
          src: 'src/coffee_chain.coffee',
          dest: 'tasks/coffee_chain.js'
        },
        default_options: {
          src: 'test/fixtures/default_options.coffee',
          dest: 'tmp/default_options.js'
        },
        test: {
          dest: 'test/integration/compiled/coffee_chain_test.js',
          src: 'test/integration/src/coffee_chain_test.coffee'
        },
        gruntfile: {
          dest: 'Gruntfile.js',
          src: 'Gruntfile.coffee'
        }
      },
      nodeunit: {
        tests: ['test/integration/compiled/*_test.js']
      }
    });
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    grunt.registerTask('compile', ['clean:scripts', 'coffeeChain:compile', 'coffeeChain:gruntfile', 'cleanTest']);
    grunt.registerTask('cleanTest', ['clean:tests', 'coffeeChain:test']);
    grunt.registerTask('test', ['coffeeChain:default_options', 'nodeunit']);
    return grunt.registerTask('default', ['compile']);
  };

}).call(this);
