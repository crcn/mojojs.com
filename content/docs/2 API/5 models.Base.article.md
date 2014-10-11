{{
  properties: {
    category: "api"
  }
}}

<!--
TODO - pull JSONP data from streams such as twitter
-->

Extends [bindable.Object](/docs/api/bindableobject) <br />

Models, like views, are plugin-based, meaning you can customize how models behave based on the properties defined in the class. You can also create your own plugins for models. By default, mojo-models come with a few: persist, virtuals, and bindings.

### Installation

```
npm install mojo-models
```

### Features

- easy to extend. register your own custom plugins to extend the functionality of models.

### Examples

- https://github.com/mojo-js/mojo-todomvc-example
- [deserializing data](http://requirebin.com/?gist=d174776852d4f1a13bc4)
- [loading models](http://requirebin.com/?gist=ef4c57b8004501d15447)
- [collections](http://requirebin.com/?gist=516f703d3eeb719940a1)


### See Also

- [bindable.js](https://github.com/classdojo/bindable.js) - base class for models & collections
- [mojo-application](https://github.com/mojo-js/mojo-application) - entry point to application

## API

#### Base(properties[, [application](https://github.com/mojo-js/mojo-application)])

Extends [bindable.Object](https://github.com/mojo-js/bindable.js)

base model constructor

- `properties` - properties to set on the model
- `application` - (optional) mojo application

```javascript
var models = require("mojo-models");
var model = new models.Base({ message: "Hello world!" });
console.log(model.message);
```

#### data

The raw data set on the model - this is usually transformed into something the model can
use via `deserialize`.

```javascript
var model = new models.Base({ data: { message: "Hello world!" }});
consol.log(model.message); // Hello world!
console.log(model.data); // { message: "Hello world!" }
```

#### deserialize(data)

deserializes data once `data` is set on the model

Example: http://requirebin.com/?gist=d174776852d4f1a13bc4

```javascript


var Person = models.Base.extend({
  deserialize: (data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.firstName + " " + data.lastName
    };
  }
});

var person = new Person({
  data: {
    firstName: "Craig",
    lastName: "Condon"
  }
});

console.log(person.fullName); // Craig Condon

person.set("data", {
  firstName: "A",
  lastName: "B"
});

console.log(person.fullName); // A B
```

#### base.serialize()

serializes data. This is an alias to `toJSON`

## Extended API

#### persist

Persistence layer for models / collections. Also adds the methods `load`, `save`, and `remove`.

```javascript
var superagent = require("superagent");

var Person = models.Base.extend({
  persist: {
    load: function (onLoad) {
      superagent.get("/people/" + this._id).end(onLoad);
    },
    remove: function (onRemove) {
      superagent.del("/people/" + this._id).end(onRemove);
    },
    save: function (onSave) {
      if (this._id) {
        superagent.put("/people/" + this._id).body(this.serialize()).end(onSave);
      } else {
        superagent.post("/people").body(this.serialize()).end(onSave);
      }
    }
  },
  serialize: function () {
    return {
      firstName: this.firstName,
      lastName: this.lastName
    };
  }
});

var person = new Person({ _id: "person1" });

person.set("firstName", "Craig");

person.save(); // POST /people/person1 { firstName: "Craig" }
person.load(); // loads the s
person.remove(); // removes the model
```

#### model.load(onLoad)

calls the `persist.load` function, and sets result to `data` to be deserialized on the model. Note that
load can be called only once. Use `reload` to reload the model

#### model.reload(onReload)

reloads the model

#### model.save(onSave)

calls the `persist.save` function, and sets result to `data` to be deserialized on the model.

#### model.remove(onRemove)

removes the model

#### Persist events

- `willSave` - emitted when the model is about to be saved
- `didSave` - emitted when the model has been saved
- `willRemove` - emitted when the model is about to be removed
- `didRemove` - emitted when the model has been removed


removes the model

#### virtuals

Virtual properties all you to load external resources as they're needed. This is especially useful when
data-binding models to views.


```javascript

var superagent = require("superagent");

var Friends = models.Collection.extend({

  // creates a new person for each item in .data
  createModel: function (options) {
    return new Person(options, this.application);
  },
  persist: {

    // executed when .load, or .reload is called
    load: function (complete) {
      superagent.get("/person/" + this.friendee._id + "/friends").end(function (err, result) {
        complete(null, result);
      });  
    }
  }
});

var Person = models.Base.extend({
  virtuals: {

    // triggered on bind()
    friends: function (onLoad) {
      new Friends({ friendee: this }).load(onLoad);
    }
  }
});

var person = new Person({ _id: "person1" });

console.log(person.get("friends")); // should be undefined

// activates virtual property, and calls /person/person1/friends API
person.bind("friends", function (friends) {
  this.dispose(); // dispose the binding immediately

});

```

#### bindings

Bindings allow you to compute properties on models.

```javascript

var bindable = require("bindable");

var Person = models.Base.extend({
  bindings: {
    "firstName, lastName": function (firstName, lastName) {
      this.set("fullName", firstName + " "+ lastName);
    }
  }

var person = new Person({ firstName: "A", lastName: "B" });
console.log(person.fullName); //
document.body.appendChild(person.render());
```

<!--
## Unit Testing

Unit tests are very easy to write for mojo-models. Here's a basic example using `mocha`, and `expect.js`:

View:

```javascript
var models = require("mojo-models");
module.exports = models.Base.extend({
    bindings: {
        "firstName, lastName": function (firstName, lastName) {
            this.set("fullName", firstName + " " + lastName);
        }
    }
});
```

Unit Test:

```javascript
var Person = require("./person"),
expect = require("expect.js");

describe(__filename + "#", function() {

    var model;

    beforeEach(function() {
        model = new Person();
    });

    it("properly computes first / last name when changed", function () {
        model.setProperties({
          firstName: "A",
          lastName: "B"
        });
        expect(model.get("fullName")).to.be("A B");
    });
});
```
-->
