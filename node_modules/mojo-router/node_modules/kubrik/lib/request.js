var bindable = require("bindable"),
_            = require("underscore"),
qs           = require("querystring");

function Request (options) {

  bindable.Object.call(this, this);

  this.pathname = options.pathname;
  this.query    = new bindable.Object(options.query  || {});
  this.params   = new bindable.Object(options.params || {});
  this.router   = options.router;

  this._rebuildUrl = _.bind(this._rebuildUrl, this);

  this.query.on("change", this._rebuildUrl);
  this.params.on("change", this._rebuildUrl);
  this.on("change", this._rebuildUrl);
}

bindable.Object.extend(Request, {
  __isRequest: true,
  equals: function (request) {
    if (request.pathname !== this.pathname) return false;
    return true;
  },
  redirect: function (pathname, options) {
    this.router.redirect(pathname, options);
  },
  mergeQuery: function (query) {
    var q = query.context();

    for (var property in q) {
      if (this.query.has(property)) continue;
      this.query.set(property, q[property]);
    }
  },
  _rebuildUrl: function () {

    var url = this.get("pathname");

    if (this.query.keys().length) {
      url += "?" + qs.stringify(this.query.context());
    }

    this.set("url", url);
  }
});


module.exports = Request;
