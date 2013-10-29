mojo = require "mojojs"
fs   = require "fs"
pc   = require "paperclip"

class MainView extends mojo.View
  paper: require("./index.pc")
  sections:
    pages: require("./pages")


module.exports = MainView