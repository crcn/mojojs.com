{{
  properties: {
    category: "api"
  }
}}

Main entry point to mojo-based applications.

## Usage

You should override the Application like so:

```javascript
var Application = require("mojo-application");
var MyApplication = Application.extend({
  registerPlugins: function () {

    // register all modules here
    this.use(require("mojo-views"));

    // default models
    this.use(require("mojo-models"));

    // use any template engine
    this.use(require("mojo-htmlbars"));
  },
  willInitialize: function (options) {
    // executes before initializing
  },
  didInitialize: function (options) {
    // executes after initializing
  }
});

var app = new MyApplication();
app.initialize({
  element: document.getElementById("application")
});
```
