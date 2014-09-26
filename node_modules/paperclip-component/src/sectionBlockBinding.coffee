pc = require "paperclip"

###
 Does a few things - defines sections, and uses them. For example:

 defining:

 {{#section:"list"}}

  {{ 
    view: {
      type: "list",
      source: students
    }
  }}

 {{/}}

 using:

 {{ section: sections.list }}
###

class SectionBlockBinding extends pc.BaseBlockBinding

  ###
   called when needed, otherwise content is never created.
  ###

  render: () ->

    # create only once
    #unless @_content
    @_content = @contentTemplate.bind(@context)
    @_content.section.render()

  ###
  ###

  remove: () ->
    @_content?.remove()


  ###
  ###

  _onChange: (value) =>
  
    if @contentTemplate
      @_changeDefinition value
    else
      @_changeContent value

  ###
  ###

  unbind: () ->
    super()
    @_content?.unbind()

  ###
  ###

  _changeDefinition: (value) ->

    # reference to this block so that when referenced, the content
    # is instantiated
    @context.set "sections.#{value}", @

  ###
  ###

  _changeContent: (value) ->

    @section.removeAll()

    if value
      @section.append value.render()


module.exports = SectionBlockBinding