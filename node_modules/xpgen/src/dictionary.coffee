###
 stores registered element chains
###

module.exports = class 

  ###
  ###

  constructor: () ->
    @_chains = {}
  
  ###
  ###

  add: (key, chain) ->
    @_chains[key] = chain.clone()

  ###
  ###

  get: (key) ->
    throw new Error "chain #{key} does not exist" if not @_chains[key]
    return @_chains[key]
