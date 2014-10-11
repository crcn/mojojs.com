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

Creates a list of views which is represented by a bindable collection. Note that each model is set as model property for each list item view created. See the example below.

### Installation

```javascript
npm install mojo-views --save-exact
```

### Basic Example

```javascript
var bindable = require("bindable");

var items = new bindable.Collection([
  new bindable.Object({ text: "hello 1" }),
  new bindable.Object({ text: "hello 2" }),
  new bindable.Object({ text: "hello 3" })
]);

var ItemView = views.Base.extend({
  didCreateSection: function () {
    this.section.appendChild(this.nodeFactory.createTextNode(this.get("model.text")));
  }
});

var ItemsView = new views.List.extend({
  modelViewClass: ItemView
});

var items = new ItemsView({ source: items });
document.body.appendChild(items.render());
```

#### source

The source of the list. This should be a [bindable.Collection](https://github.com/classdojo/bindable.js).
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
