var bindable = require("bindable"),
Route        = require("./route"),
Decorators   = require("./decorators");

function Routes (router) {
  this._source    = [];
  this.router     = router;
  this.decorators = new Decorators();
}

bindable.Object.extend(Routes, {

  /**
   */

  add: function (routes, parent) {

    if (!routes) return;
    if (!parent) this.decorators.decorate(parent = new Route(null, routes, this));

    for (var key in routes) {
      if (key.substr(0, 1) === "/") {

        var routeOptions = routes[key],
        routePath = (parent.pathname || "") + key,
        route;

        this._source.push(this.decorators.decorate(route = new Route(routePath, routeOptions, this, parent)));

        // add route options. might not exist.
        this.add(routeOptions.routes || routeOptions, route);
      }
    }

    this._resort();

    return this;
  },

  /**
   */

  all: function () {
    return this._source;
  },

  /**
   */

  find: function (query) {
    for (var i = this._source.length; i--;) {
      var route = this._source[i];
      if (route.match(query)) return route;
    }
  },

  /**
   */

  _resort: function () {
    this._source = this._source.sort(function (a, b) {

      var ap = a.pathname.split("/"),
      bp     = b.pathname.split("/");

      if (ap.length > bp.length) {
        return -1;
      } else if (ap.length < bp.length) {
        return 1;
      }


      for (var i = 0, n = ap.length; i < n; i++) {

        var apn = ap[i],
        bpn     = bp[i];

        if (apn !== bpn)
        if (apn.substr(0, 1) === ":") {
          return -1;
        } else {
          return 1;
        }
      }

      return 1;
    });
  }
});


module.exports = Routes;
