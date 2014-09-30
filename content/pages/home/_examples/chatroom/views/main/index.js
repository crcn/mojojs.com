var views = require("mojo-views");

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  children: {
    messages: require("./messages")
  },
  createMessage: function () {
    if (!this.newMessage) return;
    this.get("messages").create({
      text: this.newMessage
    });
    this.set("newMessage", void 0);
  }
});