var views = require("mojo-views");

var HelloView = views.Base.extend({
  paper: require("./entry.pc")
});

module.exports = function (element) {
  var view = new HelloView();
  element.appendChild(view.render());
}