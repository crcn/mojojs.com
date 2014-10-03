views = require "mojo-views"

class ContentView extends views.Base
  paper: require("./index.pc")
  children:
    preview: require("./preview")
    editor: require("./editor")

module.exports = ContentView