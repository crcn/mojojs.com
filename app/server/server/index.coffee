express  = require "express"
compress = require "compression"

module.exports = (app) ->

  app.server = server = express()
  server.use(compress())
  server.get "/ab", (req, res) -> res.send "A"
  port = app.get("http.port")


  app.mediator.on "post bootstrap", (message, next) ->
    if port and process.env.NODE_ENV isnt "testing"
      server.listen(port)
      console.log "listening on port", port
    next()

  app.use require "./plugins/less"
  app.use require "./plugins/browserify"
  app.use require "./plugins/public"

  server.on "error", (err) ->
    console.error err.stack

  server
