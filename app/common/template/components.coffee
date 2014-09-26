pc                 = require "paperclip"
bindable           = require "bindable"
paperclipComponent = require "paperclip-component"
_                  = require "lodash"


module.exports = (app) ->
  
  app.once "initialize", () ->
    app.paperclip.use paperclipComponent new bindable.Object app.views._classes

