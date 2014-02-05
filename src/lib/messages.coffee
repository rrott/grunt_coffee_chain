class root.Messages
  constructor: ->
    @messages =
      missed_param: 'You should provide "src" and "dest" params in the Gruntfile'

  text: (text) ->
    @messages[text]

