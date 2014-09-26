bindable = require "bindable"

module.exports = (app) ->
  app.set "layouts", new bindable.Object {
    main: require("./main")
  }