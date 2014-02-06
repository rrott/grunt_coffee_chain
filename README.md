# grunt-coffee-chain

> grunt plugin inspired by Sprockets to compile CoffeeScripts that has sprockets-style comments to indicate dependencies.

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

#### options.clean
_(Not yet implemented)_
Type: `Booleann`
Default value: `false`

A boolean value that is used to clean resulting CoffeeScript from useless code that coffee compiler adds.

### Usage Examples

#### Default Options
In these examples, the default options are used to compile coffee scripts to js without cleaning them`

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

```js
grunt.initConfig({
  coffeeChain: {
    your_target: {
      src:  'app/assets/javascripts/main.coffee',
      dest: 'public/assets/app.js'
    }
  },
})
```

#### Custom Options
In this example, the custom options are used to compile coffee scripts to js cleaning them`

```js
grunt.initConfig({
  coffeeChain: {
    your_target: {
      options: {
        clean: true
      },
      src:  'app/assets/javascripts/main.coffee',
      dest: 'public/assets/app.js'
    }
  },
})
```

#### CoffeeScript Examples
In this example, the custom options are used to compile coffee scripts to js minifying and cleaning them`

```coffee
grunt.initConfig
  coffeeChain:
    dist:
      options:
        clean: true
      src: "app/main.coffee"
      dest: "dist/index.js"
```

## Contributing
This application is written in CoffeeScript with sprockets-style comments to indicate dependencies and so

### it compiles itself to js using previous version of itself.

Due to above, please chnage coffeescripts instead of js files in order to send a pull request.

## Release History
version 0.0.1 - first release published to npm.

version 0.1.0 - added custom minify option

version 0.1.1 - refactored version that compiles itself to itself

version 0.1.2 - 1.2.0 - some of them are incorrect and may broke the functionality. Use any higher version

version 1.2.0 - removed custom minify option. Use apropriate node modules instead

version 1.2.1 - was compilled by plugin that were compiled in common node.js way

version 1.2.2 - correctly compiled version of grunt-coffee-chain that compiles itself to itself

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/rrott/grunt_coffee_chain/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

