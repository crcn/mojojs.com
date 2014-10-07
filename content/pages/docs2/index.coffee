views = require "mojo-views"
fs = require "fs"

content = fs.readFileSync __dirname + "/content.html", "utf8"

class ContentView extends views.Base
  didCreateSection: () ->
    @section.append @application.nodeFactory.createTextNode content


class DocsView extends views.Base
  paper: require("./index.pc")
  sections:
    content: ContentView

module.exports = DocsView