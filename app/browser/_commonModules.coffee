module.exports = (app) ->
  app.views.register require("/tmp/_components.coffee")
  app.models.register require("/tmp/_models.coffee")