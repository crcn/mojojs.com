

exports.require = ["http.server", "express"]
exports.load = (httpServer, express) ->
  httpServer.use "/docs", express.static __dirname + "/../../../node_modules/mojo-docs/docs"
  