pc = require "paperclip"
bindable = require "bindable"


class LayoutBlockBinding extends pc.BaseBlockBinding

  ###
  ###

  _onChange: (value) ->

    ops = {}

    if typeof value is "string"
      ops.name = value
    else
      ops = value

    @_ctpl?.dispose()
    @_tpl?.dispose()

    tpl = pc.template @context.get("application.layouts." + ops.name), @application

    @context.set "blocks.main", (@_ctpl = @contentTemplate.bind(@context)).render()
    @_tpl?.dispose()

    @section.replaceChildNodes (@_tpl = tpl.bind(@context)).render()

  ###
  ###

  unbind: () ->
    @_tpl.dispose()
    @_ctpl.dispose()
    super arguments...



module.exports = LayoutBlockBinding
