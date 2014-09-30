var views = require("mojo-views");

var MessageView = views.Base.extend({
  paper: require("./message.pc")
})

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  children: {
    messages: {
      type: "list",
      source: "messages",
      modelViewClass: MessageView,
      sort: function (a, b) {
        return a.get("createdAt") > b.get("createdAt") ? 1 : -1;
      }
    }
  },
  createMessage: function () {
    if (!this.newMessage) return;
    this.get("messages").create({
      text: this.newMessage,
      displayName: this.displayName,
      createdAt: Date.now()
    });
    this.set("newMessage", void 0);
  }
});