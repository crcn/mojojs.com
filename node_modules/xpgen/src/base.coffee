module.exports = class

  ###
  ###

  find: (nodeName = "*") -> @_newChain("//#{nodeName}")

  ###
  ###

  element: (nodeName = "*") -> @_newChain("/#{nodeName}")

  ###
  ###

  toString: () -> ""

  ###
  ###

  _newChain: (nodeName) ->
    # OVERRIDE ME


