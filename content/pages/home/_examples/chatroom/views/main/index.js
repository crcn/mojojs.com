var views = require("mojo-views");

var MessageView = views.Base.extend({

  /**
   * message template
   */

  paper: require("./message.pc")
});

module.exports = views.Base.extend({

  /**
   * index template
   */

  paper: require("./index.pc"),

  /**
   * displays a list of messages
   */

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

  /**
   * creates a new message
   */

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