mojo = require "mojojs"

class DocsView extends mojo.View

  paper: require("./index.pc")
  sections:
    content: require("./content")

module.exports = DocsView 