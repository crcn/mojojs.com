var views   = require("mojo-views"),
Application = require("mojo-application");


var app = new Application();
app.use(views);
app.use(require("mojo-react")); // react adapter


var SomeView = views.Base.extend({
  react: require("./reactView.demo.jsx")
});

var view = new SomeView({ name: "Craig" }, app);

document.body.appendChild(view.render());