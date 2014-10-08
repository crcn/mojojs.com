bindable           = require "bindable"

module.exports = (app) ->
  pc = app.paperclip
  pc.blockBinding "layout", require("./bindings/block/layout")
  pc.blockBinding "browserify", require("./bindings/block/browserify")
  pc.blockBinding "example", require("./bindings/block/example")
  pc.blockBinding "block", require("./bindings/block/block")
  pc.blockBinding "properties", require("./bindings/block/properties")
  pc.blockBinding "properties", require("./bindings/block/properties")
  pc.attrDataBinding "clipboard", require("./bindings/dataBind/clipboard")

  unless process.browser
    pc.nodeBinding "src", require("./bindings/pollyfills/cacheBuster")
    pc.nodeBinding "href", require("./bindings/pollyfills/cacheBuster")