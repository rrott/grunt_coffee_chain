# grunt-coffee-chain

> grunt plugin inspired by Sprockets to compile chain of CoffeeScript in the way Rails 3.1's asset pipeline do compile.

## Usage (script-side)
In your CoffeeScript files, write Sprockets-style comments to indicate dependencies, e.g.

    #= require dependency

If you want to bring in a whole folder of scripts, use

    #= require_tree dir

## Usage (grunt-side)
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-coffee-chain --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-coffee-chain');
```

## The "coffeeChain" task

### Overview
In your project's Gruntfile, add a section named `coffeeChain` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  coffeeChain: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.minify
Type: `Booleann`
Default value: `false`

A boolean value that is used to set trigger to minify resulting js file.

#### options.clean
_(Not yet implemented)_
Type: `Booleann`
Default value: `false`

A boolean value that is used to clean resulting CoffeeScript from useless code that coffee compiler adds.

### Usage Examples

#### Default Options
In this example, the default options are used to compile coffee scripts to js without minifying and cleaning them`

```js
grunt.initConfig({
  coffeeChain: {
    options: {},
    your_target: {
      src:  'app/assets/javascripts/main.coffee',
      dest: 'public/assets/app.js'
    }
  },
})
```

#### Custom Options
In this example, the custom options are used to compile coffee scripts to js minifying and cleaning them`

```js
grunt.initConfig({
  coffeeChain: {
    your_target: {
      options: {
        minify: true,
        clean: trye
      },
      src:  'app/assets/javascripts/main.coffee',
      dest: 'public/assets/app.js'
    }
  },
})
```

### Usage Examples

#### Default Options
In this example, the custom options are used to compile coffee scripts to js minifying and cleaning them`

```coffee
grunt.initConfig
  coffeeChain:
    dist:
      options:
        minify: true
      src: "app/main.coffee"
      dest: "dist/index.js"
```

## Contributing
I am using CoffeeScript for this, so pull requests to js files will not be accepted. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
version 0.0.1 - first release published to npm.
version 0.1.0 - added custom minify option
version 0.1.1 - refactored version that compiles itself to itself
