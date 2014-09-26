browserify = require "browserify-middleware"
transform  = require "./transform"

module.exports = (app) ->
  app.server.get("/app/index.built.js", browserify(__dirname + "/../../../../browser/index.coffee", {
    transform: [transform],
    cache: if app.debug then 'dynamic' else true,
    minify: !app.debug,
    extensions: [".coffee", ".js"]
  }))