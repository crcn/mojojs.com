{{
  properties: {
    category: "api",
    links: {
      application: "/docs/api/-application"
    }
  }
}}

Extends [bindable.Object](/docs/api/-bindableobject) <br />
Inherited By [views.List](/docs/api/-viewslist), [views.Stack](/docs/api/-viewsstack) <br />
See also [Application]({{links.application}}),  [Templates](/docs/api/-templates)<br />

Mojo views control exactly what the user sees & does. This is where all your view-specific logic should go.

View controllers are plugin-based - they don't come with any special features out of the box, such as a template engine.
This allows you to fully customize exactly how view controllers behave. See the plugins section to understand how to extend view functionality.

### Installation

```javascript
npm install mojo-views --save-exact
```

#### View(properties[, [application]({{links.application}})])

The view constructor.

- `properties` - values to set onto the view. This could be anything.
- `application` - (optional) the [application]({{links.application}}). `Application.main` will be set if this is omitted.

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base({
  name: "Jeff"
});
console.log(someView.name, someView.get("name"));
-->
{{/}}
{{/}}


#### section

The [virtual document fragment](https://github.com/mojo-js/loaf.js) which contains all your elements. Note that
this property is created **after** the view has been rendered.

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base();
preview.element.appendChild(someView.render());
someView.section.appendChild(document.createTextNode("Hello World!"));
-->
{{/}}
{{/}}

#### [Application]({{links.application}}) application

The [application]({{links.application}}). Views use the application to communicate with other parts of your program. The application
also defines exactly how views behave through registered plugins.

<!--
TODO: example here showing different template engines.
-->

#### Boolean visible

`true` if the view is visible. `false` if the view isn't.

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base({
  didCreateSection: function () {
    this.section.appendChild(document.createTextNode("Hello World!"));
  }
});

someView.bind("visible", function (value) {
  console.log("view visible: ", value);
});

preview.element.appendChild(someView.render());

someView.remove();
-->
{{/}}
{{/}}

#### DocumentFragment render()

Renders the view, and returns a document fragment

#### override didCreateSection()

Called when the section is created. This is called **once** during the lifetime of the view.

#### override willRender()

Called immediately before rendering the view

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base({
  willRender: function () {
    console.log("about to render");
  }
});

someView.on("render", function () {
  console.log("emitted render");
});

preview.element.appendChild(someView.render());
-->
{{/}}
{{/}}

#### override didRender()

called immediately after rendering. At this point, all DOM elements should be created, and added to
the view

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base({
  didCreateSection: function () {
    console.log("created section!");
    this.section.appendChild(document.createTextNode("Hello World!"));
  },
  willRender: function () {
    console.log("about to render");
  },
  didRender: function () {
    console.log("rendered!");
  }
});

someView.on("render", function () {
  console.log("emitted render");
});

preview.element.appendChild(someView.render());
-->
{{/}}
{{/}}

#### remove()

Removes the view from the DOM

#### override willRemove()

called immediately before removing the view. Similar to `willRender`.

#### override didRemove()

called immediately after removing the view. Similar to `didRemove`.

#### Events

- `render` - emitted when rendered
- `remove` - emitted when removed
- `dispose` - emitted when disposed

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");
var someView = new views.Base();

someView.on("render", function () {
  console.log("view was rendered");
});

someView.on("remove", function () {
  console.log("view was removed");
});

someView.on("dispose", function () {
  console.log("view was disposed");
});

someView.render();
someView.dispose();
-->
{{/}}
{{/}}

## Property Scope

Views, just like variable scope, have the ability to inherit properties from their parent view. This is incredibly
useful if you want to implicitly pass properties from the parent view to the child view. For example:

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views");

var ChildView = views.Base.extend({
  willRender: function () {
    var fullMessage = this.get("message") + " " + (this.get("personName") || "Anonymous");
    this.section.appendChild(document.createTextNode(fullMessage));
  }
})

var ParentView = views.Base.extend({
  children: {
    child: ChildView
  },
  willRender: function () {
    this.section.appendChild(this.get("children.child").render());
  }
});

preview.element.appendChild(new ParentView({ message: "Hello", personName: "Jeff" }).render());
-->
{{/}}
{{/}}

### Breaking Scope

You can easily break out of variable scope simply by defining a property on the child view. For instance:

{{#example}}
{{#block:"index-js"}}
<!--
var views = require("mojo-views@0.2.1");

var ChildView = views.Base.extend({
  personName: undefined,
  message: "Yo",
  willRender: function () {
    var fullMessage = this.get("message") + " " + (this.get("personName") || "Anonymous");
    this.section.appendChild(document.createTextNode(fullMessage));
  }
})

var ParentView = views.Base.extend({
  children: {
    child: ChildView
  },
  willRender: function () {
    this.section.appendChild(this.get("children.child").render());
  }
});

preview.element.appendChild(new ParentView({ message: "Hello", personName: "Jeff" }).render());
-->
{{/}}
{{/}}



### Plugin API

#### paper

#### bindings
