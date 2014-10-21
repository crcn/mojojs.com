var models = require("mojo-models@0.3.10"),
superagent = require("superagent");

module.exports = models.Collection.extend({
  createModel: function (properties) {
    return this.application.models.create("message", properties);
  },
  persist: {
    load: function (onLoad) {
      superagent.get("/api/chatroom/messages").end(function (err, response) {
        onLoad(null, response.body);
      });
    }
  }
});