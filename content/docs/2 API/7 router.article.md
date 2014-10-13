{{
  properties: {
    category: "api"
  }
}}

HTTP router which helps maintain application state.

### Examples

- https://github.com/mojo-js/mojo-todomvc-example


### Playground Example

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();

app.use(require("mojo-bootstrap"));
app.use(require("mojo-router"));

app.router.add({
  "/": {
    name: "home",
    states: {
      main: "home",
      home: "contact"
    }
  },
  "/login": {
    name: "login",
    states: {
      main: "auth",
      auth: "login"
    }
  }
});

// bind these to views.States
app.bind("router.location", function (location) {
    console.log(location.states);
})

app.bootstrap({
  useHistory: false
}, function () {
    app.router.redirect("home");
    app.router.redirect("login");
});
-->
{{/}}
{{/}}

### Route Syntax




#### route.enter

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();

app.use(require("mojo-bootstrap"));
app.use(require("mojo-router"));

app.router.add({
  "/people/:person._id": {
    enter: function (location, next) {
      console.log("enter route");
      console.log(location.get("params"));
      next();
    }
  }
});
app.bootstrap({
  useHistory: false
}, function () {
  app.router.redirect("/people/person1", function () {
    console.log("redirected");
  });
});
-->
{{/}}
{{/}}

#### route.name

Name of the route. It's recommended that you redirect with this incase the route ever changes.

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();

app.use(require("mojo-bootstrap"));
app.use(require("mojo-router"));

app.router.add({
  enter: function (location, next) {
    console.log("enter root route");
    next();
  },
  "/people": {
    "/:person._id": {
      enter: function (location, next) {
        console.log("enter person route");
        next();
      },
      "/friends": {
        enter: function (location, next) {
          console.log("enter friends route");
          next();
        },
        states: {
          person: "friends"
        }
      },
      states: {
        people: "person"
      }
    },
    states: {
      home: "people"
    }
  }
});

app.router.bind("location", function (location) {
  console.log("current location states", location.states);
})
app.bootstrap({
  useHistory: false
}, function () {
  app.router.redirect("/people",function () {
    app.router.redirect("/people/person1",function () {
      app.router.redirect("/people/person1/friends",function () {
      });
    });
  });
});
-->
{{/}}
{{/}}

#### route.states

The application state set by the route. This is used to change your UI state. See
example above. 

<!--
TODO - show actual example
-->

#### route parameters

Just like express.js, you have the ability to create parameter loaders.

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();

app.use(require("mojo-bootstrap"));
app.use(require("mojo-router"));

app.router.param("person._id", function (location, next) {
  location.person = { name: "Ben Stiller" };
  console.log("passed through person._id param");
  next();
})

app.router.add({
  "/people/:person._id": {
  }
});
app.bootstrap({
  useHistory: false
}, function () {
  app.router.redirect("/people/person1",function () {
    console.log("redirected");
  });
});
-->
{{/}}
{{/}}

#### nested routes

You can also nest routes. 


{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");

var app = new Application();

app.use(require("mojo-bootstrap"));
app.use(require("mojo-router"));

app.router.add({
  enter: function (location, next) {
    console.log("enter root route");
    next();
  },
  "/people": {
    "/:person._id": {
      enter: function (next) {
        console.log("enter person route");
        next();
      },
      "/friends": {
        enter: function (next) {
          console.log("enter friends route");
          next();
        },
        states: {
          person: "friends"
        }
      },
      states: {
        people: "person"
      }
    },
    states: {
      home: "people"
    }
  }
});

app.router.bind("location", function (location) {
  console.log("current location states", location.states);
})
app.bootstrap({
  useHistory: false
}, function () {
  app.router.redirect("/people",function () {
    app.router.redirect("/people/person1",function () {
      app.router.redirect("/people/person1/friends",function () {
      });
    });
  });
});
-->
{{/}}
{{/}}

### API

#### router.redirect(pathnameOrRouteName[, options], complete)

- `pathnameOrRouteName` - pathname or route name to redirect to
- `options` - route name options
  - `query` - route query
  - `params` - route params
- `complete` - called when redirected

#### router.add(routes)

adds new routes to the router

#### router.location

The current location of the router

```javascript
router.bind("location", function () {
  // called whenever the location changes
});
```

#### location.query

query parameters on the location. Note that if the query changes, those changes will also be reflected in the HTTP url.

```javascript
router.bind("location", function (err, location) {
  console.log(location.get("query.hello")); // blah
  location.set("query.hello", "world"); // gets reflected in the HTTP url
});

router.redirect("/home?hello=blah");
```

#### location.params

similar to `location.query`. `location.params` are taken from the route parameters.


#### location.url

pathname + query params.

```javascript
router.bind("location", function (err, location) {
  console.log(location.get("url")); // /home?hello=blah
});

router.redirect("/home?hello=blah");
```

#### location.pathname

just the pathname of the location

#### location.redirect(pathname, options)

redirects the location
