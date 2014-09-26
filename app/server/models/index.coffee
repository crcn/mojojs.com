utils = require "../utils"

module.exports = (app) ->

  utils.bridgeCommonComponents app, "_models", "models"

