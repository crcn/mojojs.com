mojo = require "mojojs"

class HomeView extends mojo.View

  links: 
    starter: "https://github.com/classdojo/mojo-starter/archive/master.zip"
    source: "https://github.com/classdojo/mojo.js/archive/master.zip"
    siteSource: "https://github.com/classdojo/mojojs.com"

  paper: require("./index.pc")

module.exports = HomeView 