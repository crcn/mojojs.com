views = require "mojo-views"

class FastListView extends views.Base
  willRender: () ->
    section = @section
    

  _propOrValue: (prop) ->
    if typeof prop is "string"
      return @get prop
    return prop

module.exports = FastListView