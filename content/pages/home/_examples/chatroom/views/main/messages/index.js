var views = require("mojo-views");

module.exports = views.List.extend({
  source: "messages",
  modelViewClass: require("./message")
})