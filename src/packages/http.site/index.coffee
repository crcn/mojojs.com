MainView = require "./views/main"
mojo = require "mojojs"

exports.require = ["http.server", "paperclip", "express", "browserify-middleware"]
exports.load = (httpServer, pc, express, browserify) ->

  httpServer.set("views", __dirname + "/views")

  # Below is a bit hacky, but OKAY for now 
  # need to add a proper router for node.js

  app = new mojo.Application()

  httpServer.get "/", (req, res) ->

    view = new MainView {
      routes: {
        pages: "home"
      }
    }, app

    res.send view.render().toString()


  httpServer.get "/plugins", (req, res) ->

    view = new MainView {
      routes: {
        pages: "plugins"
      }
    }, app

    res.send view.render().toString()

  httpServer.get "/docs", (req, res) ->

    view = new MainView {
      routes: {
        pages: "docs"
      }
    }, app

    res.send view.render().toString()

  httpServer.get "/js/plugins.bundle.js", browserify(__dirname + "/public/js/plugins/index.js")
  httpServer.get "/js/home.bundle.js", browserify(__dirname + "/public/js/home/index.js")
  httpServer.use express.static __dirname + "/public"
