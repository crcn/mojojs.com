var protoclass = require("protoclass"),
bindable       = require("bindable"),
Request        = require("./request"),
Routes         = require("./routes"),
Url            = require("url"),
async          = require("async"),
comerr         = require("comerr"),
_              = require("underscore");

function Router (options) {

  bindable.Object.call(this, this);
  this.routes = new Routes(this);

  this.use(require("./plugins/param"));
}

bindable.Object.extend(Router, {

  /**
   */

  use: function () {
    for (var i = arguments.length; i--;) {
      arguments[i](this);
    }
    return this;
  },

  /**
   */

  init: function () {
    this.emit("init");
  },

  /**
   */

  redirect: function (path, options, next) {

    if (!options) options = { };

    if (typeof options === "function") {
      next     = options;
      options  = { };
    }

    if (!next) next = function () { };

    // parse route ~ /path/to/route?query=value
    var pathParts = Url.parse(path, true);

    // find based on the path
    var route   = this.routes.find(pathParts);

    // return if 404
    if (!route) {
      var err = comerr.notFound("path " + path + " not found");
      this.emit("error", err);
      return next(err);
    }


    // if the route name matches the pathname, then
    // rebuild the REAL path
    if (route.options.name === pathParts.pathname) {

      // rebuild the path, and parse it
      pathParts = Url.parse(route.getPathnameWithParams(options.params));

      // pass the query and params
      pathParts.query  = options.query;
      pathParts.params = options.params;
    } else {

      // otherwise, fetch the params from the route path
      pathParts.params = route.getParams(pathParts.pathname);
    }

    pathParts.router = this;

    var prevRequest = this._location,
    self            = this,
    newRequest      = new Request(pathParts);


    newRequest.setProperties({
      previousRequest : prevRequest,
      route           : route
    });


    // make sure that the previous request doesn't match this location.

    if (prevRequest) {
      if (prevRequest.equals(newRequest)) {
        prevRequest.query.setProperties(pathParts.query);
        return next(null, prevRequest);
      } else {
        newRequest.mergeQuery(prevRequest.query);
      }
    }

    this.set("_location", newRequest);

    // bind the location. This follows any redirects
    self.bind("location", { max: 1, to: function (location) {
      process.nextTick(function () {
        next(null, location);
      });
    }});

    async.waterfall([

      // exit from the previous route. Might have something like a transition
      function exit (next) {
        if (!prevRequest) return next();
        prevRequest.route.exit(newRequest, next);
      },

      // enter the new route
      function enter (next) {
        newRequest.route.enter(newRequest, next);
      },

      // set the location if there are no errors
      function () {
        self.set("location", newRequest);
      }
    ]);
  },

  /**
   */

  add: function (routes) {
    this.routes.add(routes);
    return this;
  }
});


module.exports = Router;
