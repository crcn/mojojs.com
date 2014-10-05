views = require "mojo-views"
fs = require "fs"

class HomeView extends views.Base
  __dirname: __dirname
  helloDemoSourceDir: __dirname + "/_components/helloDemo"
  interpDemoSource: __dirname + "/_components/interpolationDemo"
  paper: require("./index.pc")

module.exports = HomeView