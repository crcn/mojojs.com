MongoClient = require("mongodb").MongoClient

module.exports = (app) ->
  app.mediator.on "pre bootstrap", (m, n) ->
    MongoClient.connect app.mongo.url, (err, db) ->
      app.set "mongo.db", db
      n()