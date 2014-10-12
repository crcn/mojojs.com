{{
  properties: {
    category: "api"
  }
}}

Extends [bindable.Collection](/docs/api/bindablecollection) <br />

### Installation

```
npm install mojo-models --save-exact
```

#### Collection(properties[, [application](/docs/api/application)])

- `properties` - properties to set on the collection

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");

// gets deserialized into models
console.log(new models.Collection({
  data: [
    { _id: 1 },
    { _id: 2 },
    { _id: 3 }
  ]
}));

// source provided. must be models.
console.log(new models.Collection({
  source: [
    new models.Base({ _id: 4 }),
    new models.Base({ _id: 5 }),
    new models.Base({ _id: 6 })
  ]
}));
-->
{{/}}
{{/}}

#### data

the raw source for the collection. Should be an array.

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");

var Models = models.Collection.extend({
  createModel: function (properties) {
    return new models.Base(properties, this.application);
  }
});

var models = new Models();

models.set("data", [{ name: "a" }, { name: "b" }]);

console.log(models);
-->
{{/}}
{{/}}

#### model createModel(options)

Creates a model. This method is usually defined when extending the base collection. It's also
called when deserializing each item in `data`. See example above.

#### idProperty

The id property for each model. This id "_id" by default.

#### model create(properties)

creates a new model, and adds to the collection immediately. See example above.

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");


var Models = models.Collection.extend({
  createModel: function (properties) {
    return new models.Base(properties, this.application);
  }
});

var people = new Models();

var person1 = people.create({ name: "Charlize Theron" });
var person2 = people.create({ name: "Robert Downey Jr." });

console.log(person1);
console.log(person2);
-->
{{/}}
{{/}}

#### deserialize(data)

Deserializes `data`, and sets the returned value as the source of the array. 

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.5");


var Models = models.Collection.extend({
  createModel: function (properties) {
    return new models.Base(properties, this.application);
  },
  deserialize: function (data) {
    return data._items;
  }
});

var items = new Models({
  data: {
    _items: [
      { _id: 1 },
      { _id: 2 },
      { _id: 3 }
    ]
  }
});

console.log(items);
-->
{{/}}
{{/}}

#### serialize()

serializes collection into an array. alias to `toJSON`

### Extended API

**See extended api on [models.Base](/docs/modelsbase)**
