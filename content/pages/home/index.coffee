views = require "mojo-views"

class HomeView extends views.Base
  helloDemoSourceDir: __dirname + "/_components/helloDemo"
  interpDemoSource: __dirname + "/_components/interpolationDemo"
  paper: require("./index.pc")

module.exports = HomeView