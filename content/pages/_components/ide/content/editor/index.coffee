views = require "mojo-views"

class EditorView extends views.Base
  paper: require("./index.pc")
  children:
    sidebar: require("./sidebar")
    ace: require("./ace")

module.exports = EditorView