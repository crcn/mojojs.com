var models = require("mojo-models");

module.exports = function (app) {
  app.models.register({

    // base model for message since message objects
    // don't have any functionality
    message: models.Base,
    messages: require("./messages")
  });
};