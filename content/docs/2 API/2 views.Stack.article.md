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

The stack view is a container with many children where only one is displayed at a time.
Stack views are very useful when building Single Page Applications with navigation,
and often times with an HTTP router, such as [router](/docs/api/-router).

### Installation

```javascript
npm install mojo-views --save-exact
```

#### state

the current state of the stack view. See example above.

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

#### states

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
