var bindable = require("bindable"),
protoclass   = require("protoclass");

function BindableCall (context, fn, args) {

  this._context = context;
  this._fn      = fn;
  this._args    = args;

  BindableCall.parent.call(this);
}


protoclass(bindable.Object, BindableCall, {

  /**
   */

  load: function () {
    this.set("loading", true);
    var self = this;
    this._fn.apply(this._context, this._args.concat(function (err, data) {
      self._onResult(err, data);
    }));
  },

  /**
   */

  _onResult: function (err, data) {

    this.set("loading", false);
    this.set("error", err);
    this.set("success", !err);
    this.set("data", data);
    this.set("result", data);

    this.set("response", {
      error: err,
      data: data
    });
  }
});


module.exports = function(context, fn) {

  var args = Array.prototype.slice.call(arguments, 0);

  if (!context) {
    context = {};
  }

  if (typeof context === "function") {
    args.shift();
    fn = context;
    context = this;
  } else {
    args.splice(0, 2);
  }


  var call = new BindableCall(context, fn, args);

  call.load();

  return call;

}