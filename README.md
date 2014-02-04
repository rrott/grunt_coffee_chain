# grunt-coffee-chain

> grunt's plugin to concat coffeescripts using include derective"

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-coffee-chain --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-coffee-chain');
```

## The "coffee_chain" task

### Overview
In your project's Gruntfile, add a section named `coffee_chain` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  coffeeChain: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options
_(not yet implemented)_

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

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

## Contributing
I am using coffeescript for this, so pull requests to js files will not be accepted. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
version 0.0.1 - first release published to npm.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/rrott/grunt_coffee_chain/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

