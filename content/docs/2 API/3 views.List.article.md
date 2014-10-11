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
See Also [bindable.Collection](/docs/api/bindablecollection), [models.Collection](/docs/api/modelscollection) <br />

Creates a list of views which is represented by an array, or [bindable.Collection](/docs/api/bindablecollection).

### Installation

```javascript
npm install mojo-views --save-exact
```

#### source

The source of the list. This can be an array, or [bindable.Collection](https://github.com/classdojo/bindable.js) (recommended).
The list view creates, and appends a new instance of `modelViewClass` for each `item` in the list. Also note that the source can be a reference to a source, *or* a property
which defines the source.

{{#example}}
{{#block:"view-js"}}
<!--
var views = require("mojo-views");

var ItemsView = views.List.extend({

  // point to items property
  source: "items",
  modelViewClass: views.Base.extend({
    paper: "item: {{ model.text }} <br />"
  })
});

module.exports = ItemsView;
-->
{{/}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application"),
bindable        = require("bindable"),
MainView        = require("./view");

var app = new Application();
app.use(require("mojo-views"), require("mojo-paperclip"));

// create the view, and populate it with models
preview.element.appendChild(new MainView({

  // items can be a bindable.Collection, or array. Items
  // in the array can be a bindable.Object, or regular object.
  items: [
    { text: "hello 1" },
    { text: "hello 2" },
    { text: "hello 3" }
  ]
}, app).render());
-->
{{/}}
{{/}}

#### modelViewClass

The view class that's created for each `model` in `source`. Note
that the property `model` is set to each listed view, as shown in the example above.

#### sort(modelA, modelB)

The sorting function for the list

{{#example}}
{{#block:"view-js"}}
<!--
var views = require("mojo-views");

var PeopleView = views.List.extend({
  source: "people",
  sort: function (a, b) {
    return a.get("age") > b.get("age") ? -1 : 1;
  },
  modelViewClass: views.Base.extend({
    paper: "{{model.name}} is {{model.age}} years old <br />"
  })
});

module.exports = PeopleView;
-->
{{/}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application"),
bindable        = require("bindable"),
MainView        = require("./view");

var app = new Application();
app.use(require("mojo-views"), require("mojo-paperclip"));

// create the view, and populate it with models
preview.element.appendChild(new MainView({

  // this example uses bindable.Collection & objects instead
  people: new bindable.Collection([
    new bindable.Object({ name: "John", age: 29 }),
    new bindable.Object({ name: "Jeff", age: 21  }),
    new bindable.Object({ name: "Ben", age: 23  })
  ])
}, app).render());
-->
{{/}}
{{/}}

#### filter(model)

Filters models from the list

<!--

TODO - example here
-->
