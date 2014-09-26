
module.exports = (app) ->
  app.use require "./plugins"
  app.use require "./components"
  app.use require "./modifiers"