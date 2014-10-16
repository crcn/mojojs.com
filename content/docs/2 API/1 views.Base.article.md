{{
  properties: {
    category: "api",
    links: {
      application: "/docs/api/application",
      templates: "/docs/api/templates"
    }
  }
}}

Extends [bindable.Object](/docs/api/bindableobject) <br />
Inherited By [views.List](/docs/api/viewslist), [views.Stack](/docs/api/viewsstack) <br />
See also [Application]({{links.application}}),  [Templates]({{links.templates}})<br />

Mojo views control exactly what the user sees & does. This is where all your view-specific logic should go.

View controllers are plugin-based - they don't come with any special features out of the box, such as a template engine.
This allows you to fully customize exactly how view controllers behave. See the plugins section to understand how to extend view functionality.

### Installation

```javascript
npm install mojo-views --save-exact
```

#### Base(properties[, [application]({{links.application}})])

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

Views have the ability to inherit properties from their parent. Think of this a bit like variable scope. This mechanism
is incredibly useful if you want to implicitly pass properties from one view to the other. For example:

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

In many cases, you might not want to inherit properties from the parent. To stop inheriting values, simply
define whatever properties you want within each child view. This can be done either by setting properties in the prototype,
or calling `view.set(property, value)`. Here's an example:

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

The added benefit of breaking out of variable scope by defining them is that is also shows exactly
what properties the view expects.

## Extended API

Below are a list of optional extensions you can use for mojo views.

#### paper

Defined by the [paperclip]({{links.paperclip}}) extension. The property expects either a compiled template (function),
or string to compile. Here's an example:

{{#example}}
{{#block:"index-js"}}
<!--
var views   = require("mojo-views"),
paperclip   = require("mojo-paperclip@0.6.3"),
Application = require("mojo-application");

var app = new Application();
app.use(views, paperclip, require("./views"));

preview.element.appendChild(app.views.create("view1", { name: "Craig" }).render());
preview.element.appendChild(app.views.create("view2", { name: "Craig" }).render());
preview.element.appendChild(app.views.create("view3", { name: "Craig" }).render());
-->
{{/}}
{{#block:"views/index-js"}}
<!--
var views = require("mojo-views");

// compiled as the file's required
var View1 = views.Base.extend({
  paper: require("./template.pc")
});

// you can also define a string, and the extension will
// automatically compile it for you
var View2 = views.Base.extend({
  paper: "string template - hello {{name}}! <br />"
});


// You can also manually generate the DOM elements
var View3 = views.Base.extend({
  paper: function (fragment, block, element, text) {
    return fragment([
      text("manually created template - hello "),
      block({
        value: {
          run: function () {
            return this.get(["name"]);
          },
          refs: [["name"]]
        }
      }),
      text("!"),
      element("br")
    ]);
  }
});

module.exports = function (app) {
  app.views.register({
    view1: View1,
    view2: View2,
    view3: View3
  });
}
-->
{{/}}
{{#block:"views/template-pc"}}
<!--
compiled template - hello {{name}}! <br />
-->
{{/}}
{{/}}



#### bindings

Bindings allow you to compute properties on each view.

{{#example}}
{{#block:"index-js"}}
<!--
var views        = require("mojo-views"),
    Application  = require("mojo-application"),
    bindable     = require("bindable");

var PersonView = views.Base.extend({
  paper: require("./index.pc"),
  bindings: {
    "model.firstName, model.lastName": function (firstName, lastName) {
      this.set("fullName", firstName + " " + lastName);
    }
  }
});

var app = new Application();
app.use(views, require("mojo-paperclip"));


var person = new PersonView({
  model: new bindable.Object({
    firstName: "Gordon",
  lastName: "Ramsay"
  })
}, app);

preview.element.appendChild(person.render());
-->
{{/}}
{{#block:"index-pc"}}
<!--
  hello {{ fullName }}!
-->
{{/}}
{{/}}

#### children

Children allow you to define child view controller which get added to the view controller. This allows a greater level of
organization in your codebase. Here's an example of a basic view structure:

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
var app = new Application();
app.use(require("mojo-views"), require("mojo-paperclip"), require("./views"));
preview.element.appendChild(app.views.create("home", {
  user: {
    fullName: "Sendra Bullock"
  }
}).render());
-->
{{/}}
{{#block:"views/index-js"}}
<!--
module.exports = function (app) {
  app.views.register("home", require("./home"))
}
-->
{{/}}
{{#block:"views/home/index-js"}}
<!--
module.exports = require("mojo-views").Base.extend({
  paper: require("./index.pc"),
  children: {
    header: require("./header"),
    content: require("./content")
  }
});
-->
{{/}}
{{#block:"views/home/index-pc"}}
<!--
Entire Application: <br />
{{ html: children.header }}
{{ html: children.content }}
-->
{{/}}
{{#block:"views/home/header-js"}}
<!--
module.exports = require("mojo-views").Base.extend({
  paper: require("./header.pc")
});
-->
{{/}}
{{#block:"views/home/header-pc"}}
<!--
<br />Header: <br />
Welcome back {{ user.fullName }}
-->
{{/}}
{{#block:"views/home/content-js"}}
<!--
module.exports = require("mojo-views").Base.extend({
  paper: require("./content.pc")
});
-->
{{/}}
{{#block:"views/home/content-pc"}}
<!--
<br />Content: <br />
Some content!
-->
{{/}}
{{/}}

<!--


## Unit Testing

Unit tests are very easy to write for mojo-views. Here's a basic example using `mocha`, and `expect.js`:

View:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
    : {
        "firstName, lastName": function (firstName, lastName) {
            this.$(this.textNode).val(firstName + " " + lastName);
        }
    },
    didCreateSection: function () {
        this.textNode = this.application.nodeFactory.createTextNode("");
        this.section.appendChild(this.textNode);

    }
});
```

Unit Test:

```javascript
var PersonView = require("./person"),
expect = require("expect.js");

describe(__filename + "#", function() {

    var view;

    beforeEach(function() {
        view = new PersonView();
    });

    it("displays the information properly", function () {
        var fragment = view.render();
        view.setProperties({
            firstName: "Liam",
            lastName: "Don"
        });
        expect(fragment.childNodes[0].nodeValue).to.be("Liam Don");
    });
});
```

-->
