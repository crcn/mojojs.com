pc = require "paperclip"
mojo = require "mojojs"
bindable = require "bindable"
sift = require "sift"
type = require "type-component"
  
class EachBinding extends pc.BaseBlockBinding
  
  ###
  ###

  bind: (context) =>

    paper = @contentTemplate.paper

    class ItemView extends mojo.View
      paper: paper

    @_view = context.application.createView "list", {
      modelViewClass: ItemView
    }

    @_view.set "parent", context
    @section.append @_view.render()

    super arguments...


  ###
  ###

  _onChange: (value) =>
    @_view.setProperties value



module.exports = EachBinding 