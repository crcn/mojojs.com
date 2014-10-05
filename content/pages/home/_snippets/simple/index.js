// commonjs & AMD are supported out of the box
var HelloView = mojo.views.Base.extend({
  paper: require("./template.pc")
});

module.exports = function (element) {
  var view = new HelloView();

  // render() returns a document fragment
  element.appendChild(view.render());
}