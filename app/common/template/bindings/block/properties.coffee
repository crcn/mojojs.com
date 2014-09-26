pc = require "paperclip"
bindable = require "bindable"

class PropsBinding extends pc.BaseBlockBinding

  ###
  ###

  _onChange: (value) -> @context.setProperties value

module.exports = PropsBinding
