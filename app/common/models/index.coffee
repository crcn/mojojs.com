models = require "mojo-models"

module.exports = (app) ->
  app.models.register {
    object: models.Base,
    collection: models.Collection
  }