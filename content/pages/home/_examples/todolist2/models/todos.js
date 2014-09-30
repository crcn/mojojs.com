var models = require("mojo-models");

module.exports = models.Collection.extend({
  createModel: function (options) {
    return this.application.models.create("todo", options);
  },
  clearCompleted: function () {
    for (var i = this.length; i--;) {
      if (this.at(i).get("done")) this.splice(i, 1);
    }
  }
});