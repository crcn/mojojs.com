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
      modelViewClass: MessageView
    }
  },
  createMessage: function () {
    if (!this.newMessage) return;
    this.get("messages").create({
      text: this.newMessage
    });
    this.set("newMessage", void 0);
  }
});