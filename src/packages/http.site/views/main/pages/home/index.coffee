mojo = require "mojojs"

class HomeView extends mojo.View
  downloadLink: "https://github.com/classdojo/mojo-starter/archive/master.zip"
  paper: require("./index.pc")

module.exports = HomeView 