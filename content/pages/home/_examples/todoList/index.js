var views   = require("mojo-views"),
Application = require("mojo-application");

var app = new Application();
app.use(views);
app.use(require("mojo-paperclip"));

var HelloView = views.Base.extend({
  paper: require("./template.pc")
});

exports.run = function (element) {
  var view = new HelloView(null, app);
  element.appendChild(view.render());
}