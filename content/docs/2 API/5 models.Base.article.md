{{
  properties: {
    category: "api",
    links: {
      application: "/docs/api/application"
    }
  }
}}

<!--
TODO - pull JSONP data from streams such as twitter
-->

Extends [bindable.Object](/docs/api/bindableobject) <br />
See Also [models.Collection](/docs/api/modelscollection), [Application]({{links.application}}) <br />

Models represent data, and implement properties, methods, and virtuals depending on how you need to interact with that data. Just like views, models are also extendable. 

### Installation

```
npm install mojo-models --save-exact
```

#### Base(properties[, [application](/docs/api/application)])

base model constructor

- `properties` - values to set onto the view. This could be anything.
- `application` - (optional) the [application]({{links.application}}). `Application.main` will be set if this is omitted.

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");
var model = new models.Base({ message: "Hello world!" });
console.log(model.message);
-->
{{/}}
{{/}}

#### data

The raw data set on the model - this is usually transformed into something the model can
use via `deserialize`.

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");
var model = new models.Base({ data: { message: "Hello world!" }});
console.log(model.message); // Hello world!
console.log(model.data); // { message: "Hello world!" }
model.set("data", { message: "Hola Mundo!" });
console.log(model.message); // Hola Mundo!
console.log(model.data); // { message: "Hola Mundo!" }
-->
{{/}}
{{/}}

#### deserialize(data)

deserialize takes the `data` property on the model, and transforms the returned values as *additional*
properties on the model. 

{{#example}}
{{#block:"index-js"}}
<!--
var models  = require("mojo-models"),
Application = require("mojo-application");

var app = new Application();
app.use(models);

var Person = models.Base.extend({
  deserialize: function (data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.firstName + " " + data.lastName,
      createdAt: new Date(data.createdAt)
    };
  }
});

// first set the properties on the instance
var person = new Person({ firstName: "Craig", lastName: "Jefferds" }, app);

console.log(person);

// set the data on the person, deserializing the data, and setting
// to the model again
person.set("data", { firstName: "Sarah", lastName: "Smith", createdAt: "2014-10-12T18:24:15.944Z" });

console.log(person);
-->
{{/}}
{{/}}

#### base.serialize()

serializes data. This is an alias to `toJSON`

## Extended API

#### persist

Persistence layer for models / collections. Also adds the methods `load`, `save`, and `remove`.


{{#example}}
{{#block:"todo-js"}}
<!--
var models = require("mojo-models"),
transport  = require("./transport");

var Todo = models.Base.extend({
  persist: {
    load: function (onLoad) {
      transport.get("/api/todos/" + this._id, onLoad);
    },
    save: function (onSave) {
      if (this._id) {
        transport.put("/api/todos/" + this._id, { body: this.serialize() }, onSave);
      } else {
        transport.post("/api/todos", { body: this.serialize() }, onSave);
      }
    },
    remove: function (onRemove) {
      transport.del("/api/todos/" + this._id, onRemove);
    }
  },
  deserialize: function (data) {
    return {
      _id: data._id,
      text: data.text,
      createdAt: new Date(data.createdAt)
    }
  },
  serialize: function () {
    return {
      _id: this._id,
      text: this.text
    }
  }
});

module.exports = Todo;
-->
{{/}}
{{#block:"transport-js"}}
<!--
var superagent = require("superagent");

module.exports = {
  get: function (path, options, complete) {
    superagent.
    get(path).
    query(options.query || {}).
    end(function (err, response) {
      if (err) return complete(err);
      complete(err, response.body);
    });   
  },
  put: function (path, options, complete) {
    superagent.
    put(path).
    send(options.query || {}).
    end(function (err, response) {
      if (err) return complete(err);
      complete(err, response.body);
    });   
  },
  post: function (path, options, complete) {
    superagent.
    post(path).
    send(options.body || {}).
    end(function (err, response) {
      if (err) return complete(err);
      complete(err, response.body);
    });   
  },
  del: function (path, complete) {
    superagent.
    del(path).
    end(function (err, response) {
      if (err) return complete(err);
      complete(err, response.body);
    });   
  }
}
-->
{{/}}
{{#block:"index-js"}}
<!--
var Todo   = require("./todo"),
paperclip  = require("paperclip");

var todo = new Todo();

todo.on("willSave", function () {
  console.log("saving ", todo);
});

todo.on("didSave", function () {
  console.log("saved ", todo);
});

todo.on("willRemove", function () {
  console.log("removing ", todo);
});

todo.on("didRemove", function () {
  console.log("removed ", todo);

  // remove _id to remove the button
  todo.set("_id", void 0);
});

var fragment = paperclip.template(require("./template.pc")).bind(todo).render();

preview.element.appendChild(fragment);
-->
{{/}}
{{#block:"template-pc"}}
<!--
<input type="text" class="form-control" placeholder="add a new todo!" data-bind="{{ model: <~>text, onEnter: save() }}"></input>
{{#if:_id}}
<input type="submit" class="btn btn-default" value="remove todo" data-bind="{{ onClick: remove() }}"></input>
{{/}}
-->
{{/}}
{{/}}
#### model.load(onLoad)

Defined when `persist` is present, and calls `persist.load`. 

- `onLoad` - onLoad callback function. Expects an `(err, data)` response. `data` is set as the `data` property
on the model, and gets `deserialized`.

Note that this method can be called only *once* during the lifetime of the model. If you want to reload the 
model, you'll need to call the `reload` method.

#### model.reload(onReload)

Reloads the model. This can be called many times.

#### model.save(onSave)

Similar to `model.load`. Calls the `persist.save` function, and sets result to `data` to be deserialized on the model.

#### model.remove(onRemove)

Removes the model. Note that if the model is part of a `models.Collection`, the model will automatically
be removed from the collection.

#### Persist events

- `willSave` - emitted when the model is about to be saved
- `didSave` - emitted when the model has been saved
- `willRemove` - emitted when the model is about to be removed
- `didRemove` - emitted when the model has been removed

See above for example.

#### virtuals

Virtual properties allow you to load external resources on demand. This is especially useful when you're
data-binding a model property to a view layer, and only what to load what the user currently needs. 

Note that virtual properties are triggered when they are data-bound.

<!-- 
TODO - need production apps as examples
-->

{{#example}}
{{#block:"models-js"}}
<!--
var models = require("mojo-models@0.3.4");

var User = models.Base.extend({
  virtuals: {
    projects: function (onLoad) {
      this.application.models.create("projects", {
        user: this
      }).load(onLoad);
    }
  }
});

var Projects = models.Collection.extend({
  createModel: function (properties) {
    return this.application.models.create("project", properties);
  },
  persist: {
    load: function (onLoad) {
        
      // simulate async latency
      setTimeout(onLoad, Math.random() * 1000, null, [
        { _id: "p1", name: "Sift.js" },
        { _id: "p2", name: "Awsm.js" },
        { _id: "p3", name: "Mojo.js" }
      ]);
    }
  }
});

var Project = models.Base.extend({
  virtuals: {
    tags: function (onLoad) {
      this.application.models.create("tags", {
        project: this
      }).load(onLoad);
    }
  }
});

var Tags = models.Collection.extend({
  createModel: function (properties) {
    return this.application.models.create("project", properties);
  },
  persist: {
    load: function (onLoad) {
      
      var data = {
        p1: [
          { _id: "t1", name: "filtering" },
          { _id: "t2", name: "mongodb" },
          { _id: "t3", name: "syntactic" }
        ],
        p2: [
          { _id: "t1", name: "ec2" },
          { _id: "t2", name: "aws" },
          { _id: "t3", name: "mongodb" }
        ],
        p3: [
          { _id: "t1", name: "framework" },
          { _id: "t2", name: "JavaScript" }
        ]
      };

      // simulate async latency
      setTimeout(onLoad, Math.random() * 1000, null, data[this.project._id]);
    }
  }
});

var Tag = models.Base.extend({});

module.exports = {
  user     : User,
  projects : Projects,
  project  : Project,
  tags     : Tags,
  tag      : Tag
};

-->
{{/}}
{{#block:"index-js"}}
<!--
var models  = require("./models"),
Application = require("mojo-application");

var app = new Application();
app.use(require("mojo-views@0.2.2"), require("mojo-paperclip@0.6.3"), require("mojo-models@0.3.4"));
app.models.register(models);
app.paperclip.blockBinding("each", require("./eachBlockBinding"));

var user = app.models.create("user", { name: "Ryan Gosling" });

var fragment = app.paperclip.template(require("./template.pc")).bind(user).render();

preview.element.appendChild(fragment);

-->
{{/}}
{{#block:"template-pc"}}
<!--
User: {{name}} <br />

Projects: <br />
<ul>
  {{#each:projects}}
    <li>
      {{model.name}} <br />
      Tags:
      <ul>
        {{#each:model.tags}}
            <li>{{model.name}}</li>    
        {{/}}
      </ul>
    </li>
  {{/}}
</ul>
-->
{{/}}
{{#block:"eachBlockBinding-js"}}
<!--
var paperclip = require("paperclip"),
views         = require("mojo-views@0.2.2");

module.exports = paperclip.BaseBlockBinding.extend({
  bind: function (context) {

    var ItemView = views.Base.extend({
      paper: this.contentTemplate.paper
    });

    this._view = new views.List({
      modelViewClass: ItemView,
      parent: context
    });

    this.section.append(this._view.render());

    return paperclip.BaseBlockBinding.prototype.bind.call(this, context);
  },
  _onChange: function (properties) {

    if (!properties || properties.__isBindableCollection || !properties.source) {
      properties = {
        source: properties || []
      }
    }

    this._view.setProperties(properties);
  }
});
-->
{{/}}
{{/}}

#### bindings

Bindings allow you to compute properties on models.

{{#example}}
{{#block:"index-js"}}
<!--
var models = require("mojo-models@0.3.4");

var Person = models.Base.extend({
  bindings: {
    "firstName, lastName": function (firstName, lastName) {
      this.set("fullName", firstName + " "+ lastName);
      console.log("full name set to ", this.fullName);
    }
  }
});

var person = new Person({ firstName: "Natalie", lastName: "Portman" });
-->
{{/}}
{{/}}

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
