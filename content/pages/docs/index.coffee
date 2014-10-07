views = require "mojo-views"

class DocsView extends views.Base
  paper: require("./index.pc")
  children:
    sidebar: require("./sidebar")
    content: require("./content")

module.exports = DocsView