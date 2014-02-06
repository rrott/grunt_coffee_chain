class root.Messages
  constructor: ->
    @messages =
      description:  "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order"
      missed_param: 'You should provide "src" and "dest" params in the Gruntfile'

  text: (text) ->
    @messages[text]

