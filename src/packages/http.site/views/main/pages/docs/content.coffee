mojo = require "mojojs"
fs = require "fs"

content = fs.readFileSync __dirname + "/content.html", "utf8"

class ConentView extends mojo.View

  willRender: () ->
    @section.append @application.nodeFactory.createTextNode content


module.exports = ConentView 