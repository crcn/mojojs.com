{{
  properties: {
    category: "api",
    links: {
      application: "/docs/api/application",
      templates: "/docs/api/templates"
    }
  }
}}

Extends [views.Base](/docs/api/viewsbase) <br />
See Also [http router](/docs/api/router) <br />

The stack view is a container with many children where only one is displayed at a time.
Stack views are very useful when building Single Page Applications with navigation,
and often times with something such as an HTTP [router](/docs/api/router).

### Installation

```javascript
npm install mojo-views --save-exact
```

#### state

the current state of the stack view. This property is **not** inheritable.

{{#example}}
{{#block:"main-js"}}
<!--
var views = require("mojo-views");

var HomeView = views.Base.extend({
  paper: "Home view"
});

var ContactView = views.Base.extend({
  paper: "Contact view"
});

var PagesView = views.Stack.extend({
  state: "home",
  children: {
    home: HomeView,
    contact: ContactView
  }
});

module.exports = views.Base.extend({
  paper: require("./main.pc"),
  children: {
    pages: PagesView
  }
});

-->
{{/}}
{{#block:"main-pc"}}
<!--
<a href="#" data-bind="{{ onClick: children.pages.state = 'home' }}">home</a>
<a href="#" data-bind="{{ onClick: children.pages.state = 'contact' }}">contact</a> <br />

{{ html: children.pages }}
-->
{{/}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
views           = require("mojo-views"),
paperclip       = require("mojo-paperclip@0.6.3");

var app = new Application();
app.use(views, paperclip);

app.views.register("main", require("./main"));

preview.element.appendChild(app.views.create("main").render());
-->
{{/}}
{{/}}


#### states

Allows you to control the state of multiple nested stack. This property **is** inheritable, and usually set at the root
view level.

{{#example}}
{{#block:"main-js"}}
<!--
var views = require("mojo-views");

var HomeView = views.Base.extend({
  paper: "Home view"
});

var ContactSubView1 = views.Base.extend({
  paper: "Contact subview 1"
});

var ContactSubView2 = views.Base.extend({
  paper: "Contact subview 2"
});

var ContactView = views.Stack.extend({
  children: {
    subview1: ContactSubView1,
    subview2: ContactSubView2
  }
});

var PagesView = views.Stack.extend({
  children: {
    home: HomeView,
    contact: ContactView
  }
});

module.exports = views.Base.extend({
  paper: require("./main.pc"),
  bindings: {
    "application.states": "states"
  },
  children: {
    pages: PagesView
  }
});

-->
{{/}}
{{#block:"main-pc"}}
<!--
<a href="#" data-bind="{{ onClick: application.states = { pages: 'home' } }}">home</a>
<a href="#" data-bind="{{ onClick: application.states = { pages: 'contact', contact: 'subview1' } }}">contact subview 1</a>
<a href="#" data-bind="{{ onClick: application.states = { pages: 'contact', contact: 'subview2' } }}">contact subview 2</a> <br />

{{ html: children.pages }}
-->
{{/}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
views           = require("mojo-views"),
paperclip       = require("mojo-paperclip@0.6.3");

var app = new Application({
  states: {
    pages: "contact",
    contact: "subview1"
  }
});
app.use(views, paperclip);

app.views.register("main", require("./main"));

preview.element.appendChild(app.views.create("main").render());
-->
{{/}}
{{/}}

<!--

TODO

extended documentation on router

-->
