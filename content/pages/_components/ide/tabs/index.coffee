views = require "mojo-views"

class TabView extends views.Base
  paper: require("./tab.pc")

class TabsView extends views.Base
  paper: require("./index.pc")
  sections: 
    tabs:
      type: "list"
      source: "file.files"
      modelViewFactory: (options) -> new TabView options, @application


module.exports = TabsView