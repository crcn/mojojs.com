// commonjs & AMD are supported in the browser
var HelloView = mojo.views.Base.extend({
  paper: require("./template.pc")
});

module.exports = function (element) {
  var view = new HelloView();

  // render() returns a document fragment
  element.appendChild(view.render());
}