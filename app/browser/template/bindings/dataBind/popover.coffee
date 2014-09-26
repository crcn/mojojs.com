pc       = require("paperclip")
bindable = require("bindable")

class PlaceholderDataBinding extends pc.BaseAttrDataBinding

  ###
  ###

  _onChange: (options) =>


    if options.content?.render?
      view = options.content
      options.content = view.render()
      options.html = true

      view.once "hide", () -> $node?.popover?("hide")

    $node = $(@node)?.popover?(options)

    return unless $node


    $node.parent().on "mousedown", (event) ->
      event.stopPropagation()


    if options.trigger
      $node.on options.trigger, () ->
        $(document.body).one "mousedown", (event) ->
          $node.popover("hide")

    # don't show if there is a trigger
    return if options.trigger


    # avoid layout thrashing
    @context.application.animate
      update: () =>
        $node.popover("show")







module.exports = PlaceholderDataBinding
