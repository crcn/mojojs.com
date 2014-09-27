fs = require "fs"
views = require "mojo-views"
glob = require "glob"
_ = require "lodash"
path = require "path"
utils = require "../utils"

module.exports = (app) ->
  
  app.views.register {
    main: require("./main").extend {
      sections: scanViews(app.get("directories.pages"))
    }
  }

  app.views.register require("./components")

  utils.bridgeCommonComponents app, "_components", "views"
  utils.bridgeCommonComponents app, "_serverComponents", "views", true


scanViews = (directory) ->

  viewClasses = fs.readdirSync(directory).filter((basename) ->
    not /^(index|\.|_)/.test(basename)
  ).map((basename) -> 
    viewClassOrTemplate = require(directory + "/" + basename)


    unless viewClassOrTemplate.prototype.__isView 
      viewClass = views.Base.extend 
        paper: viewClassOrTemplate
    else
      viewClass = viewClassOrTemplate

    viewClass._name = basename.split(".").shift()
    viewClass
  )


  viewMap = {}

  for viewClass in viewClasses
    viewMap[viewClass._name] = viewClass

  viewMap
