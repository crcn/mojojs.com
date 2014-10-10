{{
  properties: {
    category: "api"
  }
}}

Your Mojo application entry point. This module ties everything together, and allows other
parts of your application to communicate with each other. This should be your only [singleton](http://en.wikipedia.org/wiki/Singleton_pattern).

<!--
Note that there are two ways of using `mojo-application`. The first way is to instantiate a new `Application`,
which keeps your application *out* of the global namespace. This method requires you to **manually** pass `application` around
your application.

The other method of using `mojo-application` is to use the `Application.main` property, which is an instantiated `Application`.
Using this property won't require you to pass the application around, si

-->

### Installation

```
npm install mojo-application --save-exact
```

### Playground Example

Here's a full example of just about everything you can do with the `mojo-application` module.

{{#example}}
{{#block:"index-js"}}
<!--

var Application = require("mojo-application");

var MyApplication = Application.extend({
  plugins: [
    require("mojo-views"),     // views plugin
    require("mojo-paperclip"), // paperclip template plugin
    require("./views"),        // views specific to this application
  ],
  willInitialize: function (preview) {
    console.log("will initialize");
  },
  didInitialize: function (preview) {
    console.log("did initialize");
    preview.element.appendChild(this.views.create("main").render());
  }
});

var app = new MyApplication();

app.on("initialize", function () {
  console.log("app emitted 'initialize' event");
});

app.initialize(preview);
-->
{{/}}
{{#block:"views/index-js"}}
<!--
module.exports = function (app) {

  // register a few components
  app.views.register({
    main: require("./main")
  });
}
-->
{{/}}
{{#block:"views/main-js"}}
<!--
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./main.pc"),
  divide: function (value, multiplier) {
    return Math.round((value || 0) / multiplier);
  }
});
-->
{{/}}
{{#block:"views/main-pc"}}
<!--
<input class="form-control" type="text" placeholder="Hello! How how old are you?" data-bind="{{ model: <~>age }}"></input>

{{#if:age}}
  You're like a: <br />
  <span><strong>{{ divide(age, 5.8) }}</strong>  year old Dog.</span> <br />
  <span><strong>{{ divide(age, 2.85) }}</strong> year old Bear.</span> <br />
  <span><strong>{{ divide(age, 2.17) }}</strong> year old Hippo.</span> <br />
{{/}}
-->
{{/}}
{{/}}

#### Application(properties)

Your main application entry point.

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
var app = new Application({
  name: "some property!"
});
console.log(app.get("name"), app.name);

console.log(app.views);
-->
{{/}}
{{/}}

#### Application.main

The pre-defined application instance. This is the `default` application when the `application` parameter is omitted from the `View(properties[, application])`, and `Model(properties[, application])`
classes. Useful if you want a global reference to an application. 

#### plugins

The plugins to register when initializing the application. See `playground example` for usage.

#### use(plugins...)


{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();
app.use(function (app) {
  console.log("registering a plugin to mojo app");
  app.someModule = {
    name: "some module"
  };
}, function (app) {
  console.log("registering another plugin to mojo app");
  console.log("some module: ", app.someModule);
  app.anotherModule = {

  };
});
-->
{{/}}
{{/}}

#### initialize()

method to initialize the application. This method calls `willInitialize`, and `didInitialize`. it also
emits an `initialize` event.


#### override willInitialize()

called immediately before initializing the application

#### override didInitialize()

caled immediately after initializing the application

#### Events

- `initialize` - emitted when the application initializes

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();
app.on("initialize", function () {
    console.log("initialized!");
});
app.initialize();
-->
{{/}}
{{/}}
