var async      = require("async"),
glob           = require("glob"),
path           = require("path"),
fs             = require("fs"),
outcome        = require("outcome"),
mdeps          = require("module-deps"),
through        = require("through"),
browserResolve = require("browser-resolve"),
_              = require("lodash"),
builtins       = require("browser-builtins");

/**
 */

exports.resolve = function (options, complete) {

  var deps = [];

  var dirname = path.dirname(require.resolve(options.entry));

  mdeps(options.entry, { resolve: resolveDep }).pipe(through(function (chunk) {
    deps.push(chunk);
  }, function () {
    for (var i = deps.length; i--;) {
      var dep = deps[i];

      if (~dep.id.indexOf(dirname)) {
        dep.relpath = dep.id.replace(dirname + "/", "");
      }

      for (var j = deps.length; j--;) {
        var ddep = deps[j];
        for (var k in ddep.deps) {
          var did = ddep.deps[k];
          if (did == dep.id) {
            ddep.deps[k] = i;
          }
        }
      }

      dep.id = i;
    }

    complete(null, deps);
  }));
}




function resolveDep (id, parent, cb) {
  console.log("")
  browserResolve(id, _.extend({ modules: builtins }, parent), cb);
}