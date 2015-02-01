bindable = require "bindable"

module.exports = (app) ->
  app.set "layouts", new bindable.Object {
    main: require("./main"),
    none: require("./none.pc"),
    layoutClean: require("./layoutClean.pc")
  }