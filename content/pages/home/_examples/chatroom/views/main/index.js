var views = require("mojo-views");

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  children: {
    messages: require("./messages")
  }
});