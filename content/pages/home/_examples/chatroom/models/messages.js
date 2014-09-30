var models = require("mojo-models");

module.exports = models.Collection.extend({
  createModel: function (properties) {
    return this.application.models.create("message", properties);
  }
});