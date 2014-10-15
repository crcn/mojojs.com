
pc       = require "paperclip"
type     = require "type-component"
bindable = require "bindable"
janitor  = require "janitorjs"

module.exports = (Component) ->

  class ComponentBlockBinding extends pc.BaseBlockBinding

    ###
    ###

    constructor: () ->
      super arguments...
      @_janitor = janitor()
      @_settings = new bindable.Object()
      @_settings.bind "options", @_changeViewOptions

    ###
    ###

    _onChange: (value) =>
      ops = @_fixOptions value

      unless @_component
        @_createComponent(ops)

      @_settings.set "options", ops


    ###
    ###

    unbind: () =>
      super()
      @_janitor.dispose()
      @child?.unbind()
      @_component?.dispose()
      @_component = undefined

    ###
    ###

    _createComponent: (@viewName) =>
      @_component = new Component()
      @_component.set "parent", @context
      @section.append @_component.render()

      if @contentTemplate
        @child = @contentTemplate.bind @_component

    ###
    ###

    _changeViewOptions: (componentOptions) =>

      @_janitor.dispose()


      for key of componentOptions
        v = componentOptions[key]
        if v and v.__isBindableReference
          @_janitor.add @_bindTo key, v
          v = v.value()

        @_component.set key, v

    ###
    ###

    _bindTo: (key, bindableReference) ->
      @_component.bind key, (value) ->
        bindableReference.value value

    ###
    ###

    _fixOptions: (options) ->
      if type(options) is "object"
        return options
      else
        return { model: options }
