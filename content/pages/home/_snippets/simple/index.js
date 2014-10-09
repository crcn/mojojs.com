// commonjs & AMD are supported in the browser
var HelloView = mojo.views.Base.extend({
  paper: require("./template.pc")
});

exports.initialize = function (options) {
  var view = new HelloView();

  // render() returns a document fragment
  options.element.appendChild(view.render());
}
