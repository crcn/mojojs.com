var HelloView = require("./helloView");

module.exports = function (element) {
  var view = new HelloView();
  element.appendChild(view.render());
}