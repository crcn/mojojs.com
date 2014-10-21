var models = require("mojo-models@0.3.10"),
superagent = require("superagent"),
comerr     = require("comerr");

module.exports = models.Base.extend({

  /**
   * persistence layer for saving / loading / removing
   * the model
   */

  persist: {
    save: function (onSave) {
      var req;

      if (this._id) {
        req = superagent.put("/api/chatroom/messages/" + this._id);
      } else {
        req = superagent.post("/api/chatroom/messages");
      }

      req.send(this.serialize()).end(function (err, response) {
        if (err) return onSave(err);
        onSave(null, response.body);
      });
    },
    remove: function (onRemove) {
      if (!this._id) return onRemove(comerr.notFound());
      superagent.del("/api/chatroom/messages/" + this._id).end(onRemove);
    }
  },

  /**
   */

  deserialize: function (data) {
    return {
      _id: data._id,
      _cid: data._id,
      text: data.text,
      displayName: data.displayName,
      createdAt: new Date(data.createdAt)
    }
  },

  /**
   */

  serialize: function () {
    return {
      _id: this._id,
      _cid: this._cid,
      text: this.text,
      displayName: this.displayName
    }
  }
});