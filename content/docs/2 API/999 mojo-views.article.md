{{
  properties: {
    category: "api"
  }
}}



### views.Stack(properties[, [application](https://github.com/mojo-js/mojo-application)])

Extends [views.Base](#viewsbaseproperties-application)

The stack view is a container with many children where only one is displayed at a time. Stack views are very useful when building Single Page Applications with navigation, and often times with an HTTP router, such as [mojo-router](https://github.com/mojo-js/mojo-router).

```javascript
var Pages = views.Stack.extend({
  children: {
    home: require("./home"),
    account: require("./account")
  }
});

var pages = new Pages();
pages.set("state", "home"); // move to the home page
```

#### stack.state

the current state of the stack view. See example above.

#### stack.states

Allows you to control the state of multiple nested stack.

```javascript

var AccountPages = views.Stack.extend({
  children: {
    billing: require("./billing"),
    profile: require("./profile")
  }
});

var Pages = views.Stack.extend({
  name: "main",
  children: {
    home: require("./home"),
    account: AccountPages
  }
});

var pages = new Pages();

pages.set("states", {
  main: "account",
  account: "profile"
});
```

### views.List(properties[, [application](https://github.com/mojo-js/mojo-application)])

Extends [views.Base](#viewsbaseproperties-application)

Creates a list of views which is represented by a bindable collection. Note that each model is set as model property for each list item view created. See the example below.

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

#### list.source

The source of the list. This should be a [bindable.Collection](https://github.com/classdojo/bindable.js).
Note that this can also be a reference to another property in the list. This is especially useful when inheriting properties from a parent view. See [property scope](#property-scope) for more info.

#### list.modelViewClass

The view class that's created for each `model` in `source`. Note
that the property `model` is set to each listed view, as shown in the example above.

#### list.sort(modelA, modelB)

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

#### list.filter(model)

Filters models from the list


## Unit Testing

Unit tests are very easy to write for mojo-views. Here's a basic example using `mocha`, and `expect.js`:

View:

```javascript
var views = require("mojo-views");
module.exports = views.Base.extend({
    : {
        "firstName, lastName": function (firstName, lastName) {
            this.$(this.textNode).val(firstName + " " + lastName);
        }
    },
    didCreateSection: function () {
        this.textNode = this.application.nodeFactory.createTextNode("");
        this.section.appendChild(this.textNode);

    }
});
```

Unit Test:

```javascript
var PersonView = require("./person"),
expect = require("expect.js");

describe(__filename + "#", function() {

    var view;

    beforeEach(function() {
        view = new PersonView();
    });

    it("displays the information properly", function () {
        var fragment = view.render();
        view.setProperties({
            firstName: "Liam",
            lastName: "Don"
        });
        expect(fragment.childNodes[0].nodeValue).to.be("Liam Don");
    });
});
```
