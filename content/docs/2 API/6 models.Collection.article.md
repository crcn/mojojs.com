{{
  properties: {
    category: "api"
  }
}}

Extends [bindable.Collection](/docs/api/bindablecollection) <br />


### Collection(properties[, [application](https://github.com/mojo-js/mojo-application)])

Extends [bindable.Collection](https://github.com/mojo-js/bindable.js)

#### data

the raw source for the collection. Should be an array.

```javascript
var Models = Collection.extend({
  createModel: function (properties) {
    return new models.Base(properties, this.application);
  }
});

var models = new Models();

models.set("data", [{ name: "a" }, { name: "b" }]);

console.log(models.length); // 2
```

#### model createModel(options)

Creates a model. This method is usually defined when extending the base collection. It's also
called when deserializing each item in `data`.

```javascript
var Friend = models.Base.extend({
});

var Friends = models.Collection.extend({
  createModel: function (properties) {
    return new Friend(properties, this.application);
  }
});

var friends = new Friends();
var friend = friends.create({ firstName: "John" });

console.log(friend.firstName); // John
console.log(friends.length); // 1
```

#### model create(properties)

creates a new model, and adds to the collection immediately. See example above.

#### deserialize(data)

#### serialize()


### Extended API
