views = require "mojo-views"

class HomeView extends views.Base
  helloDemoSourceDir: __dirname + "/_components/helloDemo"
  paper: require("./index.pc")

module.exports = HomeView