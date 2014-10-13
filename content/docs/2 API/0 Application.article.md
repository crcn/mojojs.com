{{
  properties: {
    category: "api"
  }
}}

Extends [bindable.Object](/docs/api/bindableobject) <br />
See Also [views.Base](/docs/api/viewsbase), [models.Base](/docs/api/modelsbase), [templates](/docs/api/templates) <br />

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

Here's an example of how to use just about every property / method in the `Application` class.

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

- `properties` - properties to set on the application
  - `nodeFactory` - (optional) the node factory to use for creating views. Automatically set depending on the platform.

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

#### nodeFactory

The node factory to use for rendering the DOM

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application"),
nodeFactories   = require("nofactor"),
MainView        = require("./views/main.js");

var MyApplication = Application.extend({
  plugins: [
    require("mojo-views"),
    require("mojo-paperclip@0.6.1"),
    function (app) {
      app.views.register("main", MainView);
    }
  ]
});

var browserApp = new MyApplication({ nodeFactory: nodeFactories.dom    });
var nodeApp    = new MyApplication({ nodeFactory: nodeFactories.string });

// update immediately - this happens in node automatically. Overridden here
// to demonstrate the difference between a node-based & browser-based application.
nodeApp.animate = function (animatable) {
  animatable.update();
}


preview.element.appendChild(browserApp.views.create("main", {
    message: "I'm rendering for the browser!"
}).render())

console.log(nodeApp.views.create("main", {
    message: "I'm rendering for NodeJS!"
}).render().toString());
-->
{{/}}
{{#block:"views/main-js"}}
<!--
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./main.pc")
});
-->
{{/}}
{{#block:"views/main-js"}}
<!--
var views = require("mojo-views");
module.exports = views.Base.extend({
  paper: require("./main.pc")
});
-->
{{/}}
{{#block:"views/main-pc"}}
<!--
<h3>{{message}}</h3>
-->
{{/}}
{{/}}

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

called immediately after initializing the application

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

## Extended API

Below are a list of extensions to mojo applications.

#### views

Property added by [views extension](/docs/apiviewsbase) when registering to the application.

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application"),
views           = require("mojo-views"),
paperclip       = require("mojo-paperclip@0.6.3");

var app = new Application();

// register views, and paperclip. Registering paperclip
// to the application will allow the "paper" property for each view.
app.use(views, paperclip);

preview.element.appendChild(new views.Base({
  fullName: "Ryan Renolds",
  paper: "hello {{fullName}}!"
}, app).render());
-->
{{/}}
{{/}}

#### views.register(classesOrClassName[, class])

Registers a view class that's accessible anywhere in the application. This is especially useful when registering reusable components
you might want to use in something like [paperclip components](https://github.com/mojo-js/paperclip-component).

- `classesOrClassName` - classes, or class name
- `class` - the class if className is provided

```javascript
var Application = require("mojo-application"),
views = require("mojo-views");

var app = new Application();
app.use(views);
app.views.register("someViewName", views.Base);
app.views.register({
  someViewName: views.Base,
  someOtherView: views.Base.extend({
    paper: require("./someTemplate.pc")
  })
});
```

#### views.create(className, properties)

Creates a new registered view.

- `className` - the className of the view you want to create
- `properties` - the properties to assign to the created class

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application"),
views = require("mojo-views");

var app = new Application();
app.use(views);
app.views.register("base", views.Base);
var view = app.views.create("base", {
  personName: "Hillary Clinton"
});

console.log(view.personName); // Hillary Clinton
console.log(view.application == app); // true
-->
{{/}}
{{/}}

#### views.decorator(decorator)

Registers a view plugin. This is useful if you want to extend the functionality for each view. Super useful for
interpolation between different libraries. Here's an example of paperclip using the handlebars template engine:

{{#example}}
{{#block:"index-js"}}
<!--
 var views       = require("mojo-views"),
     Application = require("mojo-application"),
     handlebars  = require("handlebars");

 var app = new Application();
 app.use(views);

// register the view decorator, and
// look for the handlebars property on each view
app.views.decorator({
  getOptions: function (view) {
    return view.handlebars;
  },
  decorate: function (view, templateSource) {
    var template = handlebars.compile(templateSource);
    var div = document.createElement("div");

    function renderTemplate () {
     div.innerHTML = template(view);  
      view.section.replaceChildNodes.apply(view.section, div.childNodes);
    }

    renderTemplate();
  }
});

// create a new view class with the handlebars template
var HelloView = views.Base.extend({
  handlebars: "<h3>Hello {{message}}!</h3>"
});

// create the view, and pass in the appliation so the handlebars
// decorator gets used
var view = new HelloView({ message: "Mustache templates" }, app);

preview.element.appendChild(view.render());
-->
{{/}}
{{/}}


#### models

Property added by [models extension](/docs/api/modelsbase) when registering to the application.

#### models.register(classesOrClassName[, class])

Registers a globally accessible model class. Similar to how `views.register(...)` works.

- `classesOrClassName` - classes, or class name
- `class` - the class if className is provided


#### models.create(className, properties)

Creates a new registered model. Similar to how `models.register(...)` works.


#### models.decorate(decorator)

Registers a model extension. Works exactly like view extensions.

<!--
TODO - show example here
-->

#### animate(animatable)

Added property by the [animator](https://github.com/mojo-js/mojo-animator). The animator plugin leverages the browsers native requestAnimationFrame
function to update the DOM. It's used in views, and templates.

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
var app = new Application();
app.use(require("mojo-animator"));
app.animate({
  update: function () {
    console.log("update! called on requestAnimationFrame");
  }
})
-->
{{/}}
{{/}}

#### router

Added property from mojo-router. See [HTTP Router docs](/docs/api/router) for usage.

#### paperclip

Added property. See [paperclip template extension](/docs/api/templates) for more details.
