### Mojo Router

HTTP router which helps maintain application state.

### Examples

- https://github.com/mojo-js/mojo-todomvc-example

### See Also

- [crowbar](https://github.com/mojo-js/crowbar.js) - routing engine used
- [paperclip](https://github.com/mojo-js/paperclip.js) - template engine for links
- [mojo-views](https://github.com/mojo-js/mojo-views)

## API

**See [crowbar](https://github.com/mojo-js/crowbar.js) for extended documentation**

## Paperclip API

TODO

## Application API

#### router(application)

registers `mojo-router` to the [mojo-application](https://github.com/mojo-js/mojo-application), which will add a few properties
/ methods onto the application.

```javascript
var Application = require("mojo-application"),
router         = require("mojo-router");

var app = new Application();
app.use(router);
```

#### application.router

The [crowbar](https://github.com/mojo-js/crowbar.js) router instance

```javascript
application.router.add({
  "/home": {
    states: {
      main: "home",
      home: "contact"
    }
  }
});
```

#### application.location

the current location of the router

## Unit Testing

TODO

