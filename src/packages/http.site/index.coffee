MainView = require "./views/main"

exports.require = ["http.server", "paperclip", "express"]
exports.load = (httpServer, pc, express) ->

  httpServer.engine("pc", pc.adapters.express)
  httpServer.set("views", __dirname + "/views")

  httpServer.get "/", (req, res) ->
    view = new MainView()
    view.render () =>
      res.send view.section.toString()

  httpServer.use express.static __dirname + "/public"
