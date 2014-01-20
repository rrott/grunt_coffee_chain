(function() {
  "use strict";
  module.exports = function(grunt) {
    grunt.initConfig({
      clean: {
        tests: ["tmp"]
      },
      nodeunit: {
        tests: ["test/*_test.js"]
      },
      coffeeChain: {
        compile: {
          src: 'tasks/coffee_chain.coffee',
          dest: 'tasks/coffee_chain.js'
        },
        test: {
          src: 'test/coffee_chain_test.coffee',
          dest: 'test/coffee_chain_test.js'
        },
        default_options: {
          src: "test/fixtures/default_options.coffee",
          dest: "tmp/default_options.js"
        },
        custom_options: {
          options: {
            minify: true
          },
          src: "test/fixtures/default_options.coffee",
          dest: "tmp/custom_options.js"
        }
      }
    });
    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-coffee-chain");
    grunt.registerTask("test", ["clean", "coffeeChain", "nodeunit"]);
    return grunt.registerTask("default", ["coffeeChain", "test"]);
  };

}).call(this);
