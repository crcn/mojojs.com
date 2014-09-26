Group    = require "./group"
services = require "./services"

class Ewe

  ###
  ###

  constructor: (options = {}) ->
    @service = new services[options.service or "optimizely"](options)
    @_groups = {}

  ###
   scope identifier used to clasify exactly what variants to use. Note 
   that many users might have the same scope - depending on what country
   they might live in, or other variables. Scope can also be specific to a user
   ID
  ###

  group: (key) ->
    @_groups[key] or (@_groups[key] = new Group(key, @))


module.exports = () -> new Ewe()