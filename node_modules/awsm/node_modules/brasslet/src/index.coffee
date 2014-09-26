CallChain = require "./callChain"
flatstack = require "flatstack"
type      = require "type-component"
events = require("events")
_ = require "underscore"
bindable = require "bindable"


class Fasten extends events.EventEmitter

  ###
  ###

  constructor: () ->
    @_callChainOptions = new bindable.Object()

  ###
  ###

  add: (name, options) ->   
    @_callChainOptions.set(name, options)
    @

  ###
  ###

  options: () -> @_callChainOptions.context()

  ###
  ###

  all: (options) ->

    ctx = @_callChainOptions.context()

    for key of ctx
      for key2 of options
        @_callChainOptions.set(key + "." + key2, options[key2])

  ### 
  ###

  wrap: (type, target, callstack) ->
    new CallChain({ 
      fasten: @, 
      type: type, 
      target: target, 
      methods: @_callChainOptions.get(type),
      callstack: callstack ? flatstack()
    })


module.exports = () -> new Fasten()