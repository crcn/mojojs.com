var views = require("mojo-views");

// commonjs & AMD are supported in the browser
var HelloView = views.Base.extend({
  paper: require("./hello.pc")
});

module.exports = HelloView;