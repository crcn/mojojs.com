MainView = require "../views/main"
express  = require "express"
sift     = require "sift"
ua       = require "ua-parser"
fs       = require "fs"


module.exports = (app) ->

    
  routes = {
    "/": {
      states: {
        main: "home"
      }
    }
  }

  pageRoutes = fs.readdirSync(app.get("directories.pages"))

  for sectionName in pageRoutes
    if sectionName.substr(0, 1) == "."
      continue

    if routes["/" + sectionName] then continue


    routes["/" + sectionName] = {
      states: {
        main: sectionName
      }
    }


  app.router.add routes
  app.server.use(app.router.middleware({
      mainViewName: "main",
      getProps: (request) ->
        location: request
  }))

