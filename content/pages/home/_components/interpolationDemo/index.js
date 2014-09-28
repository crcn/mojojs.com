var views = require("mojo-views");

module.exports = views.Base.extend({
  name: "Craig",
  react: process.browser ? require("./index.jsx") : void 0
});