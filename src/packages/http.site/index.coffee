MainView = require "./views/main"

exports.require = ["http.server", "paperclip", "express", "browserify-middleware"]
exports.load = (httpServer, pc, express, browserify) ->

  httpServer.engine("pc", pc.adapters.express)
  httpServer.set("views", __dirname + "/views")

  # Below is a bit hacky, but OKAY for now 
  # need to add a proper router for node.js

  httpServer.get "/", (req, res) ->
    view = new MainView {
      routes: {
        pages: "home"
      }
    }
    view.render () =>
      res.send view.section.toString()


  httpServer.get "/plugins", (req, res) ->

    view = new MainView {
      routes: {
        pages: "plugins"
      }
    }

    view.render () =>
      res.send view.section.toString()

  httpServer.get "/js/plugins.bundle.js", browserify(__dirname + "/public/js/plugins/index.js")
  httpServer.get "/js/home.bundle.js", browserify(__dirname + "/public/js/home/index.js")
  httpServer.use express.static __dirname + "/public"
