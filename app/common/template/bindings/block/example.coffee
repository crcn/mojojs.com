pc = require "paperclip"
bindable = require "bindable"
views = require "mojo-views"


class ExampleBlockBinding extends pc.BaseBlockBinding

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

    files = new bindable.Collection

    tpl = pc.template ((fragment, block) ->
      block {
        "browserify": {
          run: () ->
            return {
              "component": "ide",
              "tabs": true,
              "showPreview": false,
              "file": new bindable.Object
                name: "/",
                files: files
            }
          refs: []
        }
      }
    ), @application

    context = new views.Base({ parent: @context })

    (@_ctpl = @contentTemplate.bind(context)).render()

    @_tpl?.dispose()

    for name of context.get("blocks")
      node = context.get("blocks." + name)
      files.push new bindable.Object {
        _id: name,
        name: name.replace('-', '.'),
        content: encodeURIComponent(node.toString().replace(/^<!--/, "").replace(/-->$/,""))
      }

    @section.replaceChildNodes (@_tpl = tpl.bind(context)).render()


  ###
  ###

  unbind: () ->
    @_tpl.dispose()
    @_ctpl.dispose()
    super arguments...



module.exports = ExampleBlockBinding
