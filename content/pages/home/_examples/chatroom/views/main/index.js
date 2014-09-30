var views = require("mojo-views");

var MessageView = views.Base.extend({

  /**
   * message template
   */

  paper: require("./message.pc")
});

module.exports = views.Base.extend({

  /**
   */

  displayName: "Anon",

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

    // ignore any blank messages
    if (!this.newMessage) return;

    // create a new message with the display name
    // of the user, along with a timestamp
    this.get("messages").create({
      text: this.newMessage,
      displayName: this.displayName,
      createdAt: Date.now()
    });

    // reset the form input
    this.set("newMessage", void 0);
  }
});