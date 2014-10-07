views = require "mojo-views"

class DocsView extends views.Base
  paper: require("./index.pc")
  fixedHeader: true,
  showFooter: false,
  children:
    sidebar: require("./sidebar")
    content: require("./content")

module.exports = DocsView