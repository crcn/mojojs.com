## Mojo Models [![Build Status](https://travis-ci.org/classdojo/mojo-models.svg)](https://travis-ci.org/classdojo/mojo-models)

### Installation

```
npm install mojo-models
```

### Features

- easy to extend. register your own custom plugins to extend the functionality of models.

### Examples

- https://github.com/mojo-js/mojo-todomvc-example

## API

### Base(properties[, [application](https://github.com/mojo-js/mojo-application)])

Inherits [bindable.Object](https://github.com/mojo-js/bindable.js)

base model constructor

- `properties` - properties to set on the model
- `application` - (optional) mojo application

```javascript
var models = require("mojo-models");
var model = new models.Base({ message: "Hello world!" });
console.log(model.message);
```

#### base.data

The raw data set on the model - this is usually transformed into something the model can 
use via `deserialize`. 

```javascript
var model = new models.Base({ data: { message: "Hello world!" }});
consol.log(model.message); // Hello world!
console.log(model.data); // { message: "Hello world!" }
```

#### base.deserialize(data)

deserializes data once `data` is set on the model

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

### Collection(properties[, [application](https://github.com/mojo-js/mojo-application)])

Inherits [bindable.Collection](https://github.com/mojo-js/bindable.js)

#### collection.data

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

#### model collection.createModel(options)

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

#### model collection.create(properties)

creates a new model, and adds to the collection immediately. See example above.


## Built-in plugins

### persist

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

#### persistable.load(onLoad)

calls the `persist.load` function, and sets result to `data` to be deserialized on the model. Note that
load can be called only once. Use `reload` to reload the model

#### persistable.reload(onReload)

reloads the model

#### persistable.save(onSave)

calls the `persist.save` function, and sets result to `data` to be deserialized on the model.

#### persistable.remove(onRemove)

removes the model

#### persistable events

- `willSave` - emitted when the model is about to be saved
- `didSave` - emitted when the model has been saved
- `willRemove` - emitted when the model is about to be removed
- `didRemove` - emitted when the model has been removed


removes the model

### virtuals

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

### bindings

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


## Application API

#### views(application)

registers `mojo-models` to the [mojo-application](https://github.com/mojo-js/mojo-application), which will add a few properties
/ methods onto the application.

```javascript
var Application = require("mojo-application"),
models         = require("mojo-models");

var app = new Application();
app.use(models);
```

#### application.models.register(modelNameOrClasses[, class])

Registers a model class that's accessible anywhere in the application. 

`modelNameOrClasses` - view name to register, or an object of classses to register
`class` - the class to register

```javascript

var app = new Application();

app.use(require("mojo-models"));

// register views one at a time
app.models.register("person", Person);

// or register multiple views at a time
app.models.register({
  person: Person,
  friends: Friends
});

var person = app.models.create("person");
```

#### application.models.create(modelName, properties)

Creates a new, registered component

- `modelName` - the registered model component name
- `properties` - the properties to assign to the created model. 

```javascript
var Person = views.Base.extend({
  
});

application.models.register("person", Person);

var hello = application.views.create("person", { name: "Craig" });

console.log(hello.name); // Craig
```

#### application.models.decorator(decorator)

Registers a model plugin. This is useful if you want to extend the functionality for each model. The implementation
is idential to [mojo view decorators](https://github.com/mojo-js/mojo-views#applicationviewsdecoratordecorator).

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
