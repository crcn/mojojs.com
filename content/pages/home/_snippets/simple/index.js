var HelloView = mojo.views.Base.extend({
  paper: require("./template.pc")
});

module.exports = function (element) {
  var view = new HelloView();
  element.appendChild(view.render());
}