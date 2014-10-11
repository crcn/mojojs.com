{{
  properties: {
    category: "api",
    links: {
      application: "/docs/api/-application",
      templates: "/docs/api/-templates"
    }
  }
}}

Extends [views.Base](/docs/api/-viewsbase) <br />
See Also [bindable.Collection](/docs/api/-bindablecollection), [models.Collection](/docs/api/-modelscollection) <br />

Creates a list of views which is represented by an array, or [bindable.Collection](/docs/api/-bindablecollection).

### Installation

```javascript
npm install mojo-views --save-exact
```

### Basic Example

{{#example}}
{{#block:"view-js"}}
<!--
var views = require("mojo-views");

var ItemsView = views.List.extend({
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
  items: new bindable.Collection([
    new bindable.Object({ text: "hello 1" }),
    new bindable.Object({ text: "hello 2" }),
    new bindable.Object({ text: "hello 3" })
  ])
}, app).render());
-->
{{/}}
{{/}}

#### source

The source of the list. This can be an array, or [bindable.Collection](https://github.com/classdojo/bindable.js) (recommended).
Note that this can also be a reference to another property in the list. This is especially useful when inheriting properties from a parent view. See [property scope](#property-scope) for more info.

#### modelViewClass

The view class that's created for each `model` in `source`. Note
that the property `model` is set to each listed view, as shown in the example above.

#### sort(modelA, modelB)

The sorting function for the list

```javascript
var bindable = require("bindable");

var people = new bindable.Collection([
  new bindable.Object({ name: "John", age: 29 }),
  new bindable.Object({ name: "Jeff", age: 21  }),
  new bindable.Object({ name: "Ben", age: 23  })
]);

var PeopleView = new views.List.extend({
  modelViewClass: PersionView, // not defined in this example
  sort: function (a, b) {
    return a.get("age") > b.get("age") ? -1 : 1;
  }
});

document.body.append(new PeopleView({ source: people }).render());
```

#### filter(model)

Filters models from the list
