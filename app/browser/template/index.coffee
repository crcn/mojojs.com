

pollyfills          = require "./pollyfills"
bindable            = require "bindable"
blockBindings       = require "./bindings/block"
paperclipBootstrap  = require "paperclip-bootstrap"
dataAttrBindings    = require "./bindings/dataBind"
TrackElementBinding = require "./bindings/element/track"


module.exports = (app) ->
  pc = app.paperclip
  pc.use require("paperclip-bootstrap")


  for name of dataAttrBindings
    pc.attrDataBinding name, dataAttrBindings[name]

  pc.nodeBinding "data-track", TrackElementBinding

  #
  for name of blockBindings
    pc.blockBinding name, blockBindings[name]

  # support for older browsers
  for name of pollyfills
    pc.nodeBinding name, pollyfills[name]
