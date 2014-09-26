express = require "express"

module.exports = (app) ->
  app.server.use express.static app.get("directories.public"), {
    maxAge: 86400000
  }