[![Build Status](https://travis-ci.org/classdojo/mojo-views.svg)](https://travis-ci.org/classdojo/mojo-views)

Controls exactly what the user sees and does. View controllers are plugin-based - they don't come with any special features out of the box, such as template engines. This allows you to fully customize exactly how view controllers behave. See [Decorators](#applicationviewsdecoratordecorator) to understand how to add / create plugins to views.

### Installation

```javascript
npm install mojo-views
```

### Features

- Easy interpolation between other libraries such as Backbone, React, Angular, etc. (no lock-in)
- Mojo views can run in the browser, along with Node.js.

### Examples

- https://github.com/mojo-js/mojo-todomvc-example
- [Hello World](http://requirebin.com/?gist=a4af5f1b896589825799)
- [Sorted List view](http://requirebin.com/?gist=7ccce61d8a95bf2cb5a5)
- [Stack View](http://requirebin.com/?gist=7ccce61d8a95bf2cb5a5)
- [Handlebars template engine](http://requirebin.com/?gist=0413cdddfb3097e696eb)
- [Paperclip template engine](http://requirebin.com/?gist=add1e20b9071e37fd9d1)
- [Computed properties](http://requirebin.com/?gist=cafd6df55bb711c88a1d)


### See also

- [bindable.js](https://github.com/classdojo/bindable.js) - base class for each view
- [mojo-paperclip](/mojo-js/mojo-paperclip) - template engine

## API


### views.Base(properties[, [application](https://github.com/mojo-js/mojo-application)])

Extends [bindable.Object](https://github.com/classdojo/bindable.js)

The base view that controls what the user sees and does

- `properties` - the properties that get set on the view controller
- `application` - (optional) the mojo application. If this is omitted, then the `global application` will be used.

[Example](http://requirebin.com/?gist=a4af5f1b896589825799): 

```javascript
var views = require("mojo-views");

var HelloView = views.Base.extend({
    didCreateSection: function () {
      this.section.appendChild(this.application.nodeFactory.createTextNode("Hello " + this.get("message") + "!"));
    }
});

var helloView = new HelloView({ message: "World" });
document.body.appendChild(helloView.render());
```


#### DocumentFragment base.render()

Renders the view, and returns a document fragment

#### base.willRender()

Called right before the view is rendered

#### base.didRender()

Called right after the view is rendered

#### base.didCreateSection()

Called once the `section` is created. This is usually where you might add elements to your view controller.

#### base.section

The section, or virtual document fragment which contains all the elements. See [loaf.js](https://github.com/mojo-js/loaf.js) for further documentation.

#### base.$

node.js-safe query selector for document elements. Useful especially for unit testing.

#### base.application

The [application](https://github.com/mojo-js/mojo-application).

#### base.remove()

Removes the view's elements from the DOM.

#### base.willRemove()

Called right before the view is removed

#### base.didRemove()

Called right after the view is removed

#### base.visible

true / false if the view is currently visible to the user

#### base.parent

reference to the parent view

#### events

- `remove` - emitted when the view is removed
- `render` - emitted when the view is rendered
- `dispose` - emitted when the view is disposed

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

## Built-in Plugins

#### bindings

Bindings allow you to compute properties on each view.

[Example](http://requirebin.com/?gist=cafd6df55bb711c88a1d):

```javascript
var views       = require("mojo-views"),
    bindable    = require("bindable");

var PersonView = views.Base.extend({
  bindings: {
    "model.firstName, model.lastName": function (firstName, lastName) {
      this.textNode.nodeValue = "Hello " + firstName + " " + lastName;
    }
  },
  didCreateSection: function () {
    this.textNode = this.application.nodeFactory.createTextNode("");
    this.section.appendChild(this.textNode);
  }
});

var person = new PersonView({
  model: new bindable.Object({
    firstName: "John",
 	lastName: "Gordon"
  })
});

document.body.appendChild(person.render());
```

#### children

Children allow you to define child view controller which get added to the view controller. This allows a greater level of
organization in your codebase. Here's an example of a basic view structure:

```javascript

// this view never actually gets removed - it's always stuck at the top
var HeaderView = views.Base.extend({
  didCreateSection: function () {
    // render elements here
  }
});

// the main home page
var HomeView = views.Stack.extend({
  didCreateSection: function () {
    // render home elements here
  }
});

var ContactView = views.Stack.extend({
  didCreateSection: function () {
    // render elements here
  }
});


// toggles between home, and contact states
var PagesView = views.Stack.extend({
  children: {
    home: HomeView,
    contact: ContactView
  }
});

// the main entry point into the views
var MainView = views.Base.extend({
  didCreateSection: function () {
    this.section.appendChild(this.children.header.render());
    this.section.appendChild(this.children.pages.render());
  },
  children: {
    header: HeaderView,
    pages: PagesView
  }
});

var mainView = new MainView();
document.body.appendChild(mainView.render());
```

## Property Scope

Views, just like variable scope, have the ability to inherit properties from their parent view. For example:

```javascript
var TodoView = views.List.extend({
  didCreateSection: function () {
    this.section.appendChild(this.nodeFactory.createTextNode(this.get("model.text")));
  }
});

var TodosListView = views.List.extend({
  modelViewClass: TodoView, 

  // this is inherited from mainView when set in the constructor
  source: "todoItems"
});

var MainView = views.Base.extend({
  children: {
    todosList: TodosListView
  },
  didCreateSection: function () {
    this.section.appendChild(this.nodeFactory.createTextNode("Todos: "));
    this.section.appendChild(this.get("children.todosList").render());
  }
});

var todos = new bindable.Collection([
  new bindable.Object({ text: "clean car" }),
  new bindable.Object({ text: "walk dog" })
]);

/*
will output:


Todos: clean car walk dog
*/

document.body.appendChild(new MainView({ todoItems: todos }).render());
```

### Breaking Scope

You can also be explicit about what properties are inherited from the parent view by setting
`define` in the view. For example:

```javascript

var ChildView = views.Base.extend({
  define: ["message"],
  message: "Hello World!",
  willRender: function () {
    this.section.appendChild(this.nodeFactory.createTextNode(this.get("message")));
  }
})

var ParentView = views.Base.extend({
  children: {
    child: ChildView
  }
  willRender: function () {
    this.section.appendChild(this.get("children.child").render());
  }
});

// outputs: "Hello World!" instead of "Blarg!"
document.body.appendChild(new ParentView({ message: "Blarg!" }).render());
```

## Application API

#### views(application)

registers `mojo-views` to the [mojo-application](https://github.com/mojo-js/mojo-application), which will add a few properties
/ methods onto the application.

```javascript
var Application = require("mojo-application"),
views           = require("mojo-views");

var app = new Application();
app.use(views);
```

#### application.views.register(viewNameOrClasses[, class])

Registers a view class that's accessible anywhere in the application. This is especially useful when registering reusable components
you might want to use in something like [paperclip-component](https://github.com/mojo-js/paperclip-component).

`viewNameOrClasses` - view name to register, or an object of classses to register
`class` - the class to register

```javascript

var app = new Application();

// register views one at a time
app.views.register("main", MainView);

// or register multiple views at a time
app.views.register({
  main: MainView,
  select: SelectView,        // re-usable select component
  loadingBar: LoadingBarView // re-usable loading bar component
  datePicker: DatePickerView // re-usable date picker view
});


var SomeView = views.Base.extend({
  didCreateSection: function () {

    // create the component, and append to this view
    this.section.appendChild(this.application.views.create("datePicker").render());
  }
});


// create some view, but use the application that 
// has all the registered components
var view = new SomeView(void 0, app);


document.body.appendChild(view.render());
```

#### application.views.create(viewName, properties)

Creates a new, registered component

- `viewName` - the registered view component name
- `properties` - the properties to assign to the created view. 

```javascript
var HelloView = views.Base.extend({
  
});

application.views.register("hello", HelloView);

var hello = application.views.create("hello", { name: "Craig" });

console.log(hello.name); // Craig
```

#### application.views.decorator(decorator)

Registers a view plugin. This is useful if you want to extend the functionality for each view. Super useful for 
interpolation between different libraries. Here's an [example](http://requirebin.com/?gist=0413cdddfb3097e696eb) of using a handlebars template engine:

```javascript

var handlebars = require("handlebars");

var HelloView = views.Base.extend({
  handlebars: "<div> hello {{name}}!</div>"
});

application.views.register("hello", HelloView);

application.views.decorator({
  getOptions: function (view) {
    return view.handlebars;
  },  
  decorate: function (view, templateSource) {
    var template = handlebars.compile(templateSource);

    function render () {
      view.section.replaceChildNodes(template(view));
    }

    render();

    // render whenever the view changes
    view.on("change", render);
  }
})
```

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
