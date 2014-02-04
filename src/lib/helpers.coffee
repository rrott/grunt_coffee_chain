class root.Helpers
  isAvaliable: (avaliable) ->
    if not avaliable
      this.showError "You should provide existant files in the Gruntfile"
      avaliable

  showError: (error) ->
    grunt.log.error error