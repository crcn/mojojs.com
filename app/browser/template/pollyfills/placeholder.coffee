pc = require "paperclip"

class PlaceholderPollyfill extends pc.BaseNodeBinding
  type: "attr"
  bind: (context) ->
    super context
    setTimeout (() =>
      $(@node).placeholder()
    ), 100

module.exports = PlaceholderPollyfill
