MainView = require "../views/main"
express  = require "express"
sift     = require "sift"
ua       = require "ua-parser"
fs       = require "fs"


module.exports = (app) ->

  app.router.param "category._id", (location, next) ->
    for cat in app.models.get("docs").source
      if cat.get("_id") is location.get("params.category._id")
        location.set "category", cat
        location.set "docContent", cat.get("content")
        break
    next()

  app.router.param "article._id", (location, next) ->
    for article in location.get("category.children")?.source
      if article.get("_id") is location.get("params.article._id")
        location.set "article", article
        location.set "docContent", article.get("content")
        break
    next()

    
  routes = {
    "/": {
      states: {
        main: "home"
      }
    },
    "/docs/:category._id": {
      name: "docCategory",
      states: {
        main: "docs"
      }
    },
    "/docs/:category._id/:article._id": {
      name: "docArticle",
      states: {
        main: "docs"
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

