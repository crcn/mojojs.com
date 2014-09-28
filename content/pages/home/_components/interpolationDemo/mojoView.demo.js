//Here's is an example of Mojo.js working with React.js
// https://github.com/mojo-js/mojo-react

var views   = require("mojo-views"),
Application = require("mojo-application");


var app = new Application();
app.use(views);

// react adapter
app.use(require("mojo-react")); 

// wrap around the JSX controller
var SomeView = views.Base.extend({

  // point to the React.js file. mojo-cli will automatically
  // find the JSX transformer in the mojo-react repo
  react: require("./reactView.jsx")
});

var view = new SomeView({ name: "Craig" }, app);

document.body.appendChild(view.render());