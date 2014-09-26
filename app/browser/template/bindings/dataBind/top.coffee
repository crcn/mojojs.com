pc       = require("paperclip")
bindable = require("bindable")

class TopDataBinding extends pc.BaseAttrDataBinding

  ###
  ###

  bind: () ->
    ret = super arguments...
    $(@node).resize @_onNodeResize
    @_size = new bindable.Object()
    @_size.bind "top", { to: @_onTopChange }
    @application.animate {
      update: () => @_onNodeResize()      
    }
    ret

  ###
  ###

  _onChange: (value) ->
    @_top = value
    @_size.set "top", @_ntop


  ###
  ###

  _onNodeResize: () =>
    @_ntop = $(@node).offset().top

    if @_top
      @_size.set "top", @_ntop


  ###
  ###

  _onTopChange: (value) =>
    if @_top and @_top.__isBindableReference
      @_top.value value






module.exports = TopDataBinding