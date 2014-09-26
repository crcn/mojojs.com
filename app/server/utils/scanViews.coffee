fs = require "fs"
views = require "mojo-views"
module.exports = (directory) ->

  viewClasses = fs.readdirSync(directory).filter((basename) ->
    not /^(index|\.)/.test(basename)
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
