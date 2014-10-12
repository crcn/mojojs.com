{{
  properties: {
    category: "api"
  }
}}

Extends [bindable.Object](/docs/coreapibindableobject)

bindable.Collection operates like arrays, except they're watchable if anything changes.

### Installation

```
npm install bindable --save-exact
```

#### Collection(source)

The constructor

{{#example}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable@0.6.0");
var items = new bindable.Collection([1, 2, 3]);
console.log(items.at(0));
console.log(items.at(1));
console.log(items.at(2));
console.log(items.source);
-->
{{/}}
{{/}}

#### source

The source of the collection. This is an array.

#### reset(source)

Resets the source of the collection. You can also do this by calling `set('source', array)`

{{#example}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable@0.6.0");
var items = new bindable.Collection([1, 2, 3]);
console.log(items.source);
items.reset([4, 5, 6]);
console.log(items.source);
items.set("source", [7, 8, 9]);
console.log(items.source);
-->
{{/}}
{{/}}


#### indexOf(item)

returns the index of an item

{{#example}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable@0.6.0");
var items = new bindable.Collection([1, 2, 3]);
console.log(items.indexOf(1));
-->
{{/}}
{{/}}

#### value at(index)

returns an item at the given index

#### each(fn)

iterates through the collection. similar to array.forEach.

#### push(values...)

pushes items to the end of the collection.

#### unshift(values...)

unshifts items to the beginning of the collection.

#### splice(index, count[, newValues...])

removes items from the collection

#### value pop()

pops the last item off the collection

#### value shift()

removes the first item from the collection

#### Events

- `insert` - emitted when items are inserted
- `update` - emitted when the collection is updated
- `reset` - emitted when the source has been reset
- `remove` - emitted when items have been removed

{{#example}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable@0.6.0");
var items = new bindable.Collection([1, 2, 3]);

items.on("insert", function (result) {
  console.log("insert ", result);
});

items.on("remove", function (result) {
  console.log("remove ", result);
});

items.on("update", function (result) {
  console.log("update ", result);
});

items.on("reset", function (result) {
  console.log("reset ", result);
});

items.reset([2, 3, 4]);
items.splice(1, 2);
items.push(6);
items.pop();
items.shift();
-->
{{/}}
{{/}}
