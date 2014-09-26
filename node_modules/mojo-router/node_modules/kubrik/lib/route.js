var bindable = require("bindable"),
async        = require("async"),
toarray      = require("toarray"),
mediocre     = require("mediocre");

function Route (pathname, options, routes, parent) {

  bindable.Object.call(this, this);

  this.pathname = pathname;
  this.parent   = parent;
  this.options  = options;
  this.routes   = routes;
  this.router   = routes.router;

  this.mediator = mediocre();
  this._setPathInfo();
}

bindable.Object.extend(Route, {

  /**
   */

  enter: function (request, next) {
    this.mediator.execute("enter", request, next);
  },

  /**
   */

  exit: function (request, next) {
    this.mediator.execute("exit", request, next);
  },

  /**
   */

  match: function (query) {
    if (query.pathname && !this._matchPath(query.pathname)) return false;
    return true;
  },

  /**
   */

  getParams: function (reqPath) {

    var routePath = this.pathname;

    var reqPathParts = reqPath.split("/"),
    routePathParts   = routePath.split("/"),
    params = {};

    for (var i = routePathParts.length; i--;) {

      var part = routePathParts[i];

      if (part.substr(0, 1) === ":") {
        params[part.substr(1)] = reqPathParts[i];
      }
    }

    return params;
  },

  /**
   */

  getPathnameWithParams: function (params) {
    var pathname = this.pathname;

    for (var key in params) {
      pathname = pathname.replace(":" + key, params[key]);
    }

    return pathname;
  },

  /**
   */

  _matchPath: function (pathname) {
    return this._pathTester.test(pathname) || this.options.name === pathname;
  },

  /**
   */

  _setPathInfo: function () {

    this.params = [];

    if (!this.pathname) return;

    this._pathTester = new RegExp("^" + this.pathname.replace(/\/\:[^\/]+/g, "/[^\/]+") + "$");

    var paramNames = this.pathname.match((/\/\:[^\/]+/g)) || [];


    for (var i = paramNames.length; i--;) {
      this.params.unshift(paramNames[i].substr(2));
    }
  }
});


module.exports = Route;
