var views   = require("mojo-views"),
Application = require("mojo-application");

var app = new Application();
app.use(views);
app.use(require("mojo-paperclip@0.5.6"));

var HelloView = views.Base.extend({
  paper: require("./template.pc")
});

exports.run = function (element) {
  var view = new HelloView(void 0, app);
  element.appendChild(view.render());
}