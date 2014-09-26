ElementChain = require "./elementChain"
Dictionary   = require "./dictionary"

XPGen = class extends require("./base")

  ###
  ###

  constructor: () ->
    super()
    @_dictionary = new Dictionary()

  ###
   DEPRECATED for path
  ###

  chain: (name) -> return @path name

  ###
  ###

  path: (name) -> return @_dictionary.get(name).clone()

  ###
  ###

  register: (name, chain) ->
    @_dictionary.add name, chain
    @

  ###
  ###

  _newChain: (nodeName) -> 
    new ElementChain nodeName, @


module.exports = () ->
  return new XPGen()