// commonjs & AMD are supported in the browser
var HelloView = mojo.views.Base.extend({
  paper: require("./template.pc")
});

var view = new HelloView();

// render() returns a document fragment
preview.element.appendChild(view.render());
