var Url = require("url"),
sa      = require("superagent"),
async = require("async"),
hurryup = require("hurryup");

/**
 */

module.exports = function (okUrl, reqUrl, complete) {
  var urls = fixUrls(okUrl, reqUrl);
  checkSSLSupport(urls.okUrl, function (useSSL) {
    complete(urls.reqUrl.replace(/^https?/, useSSL ? "https" : "http"), useSSL);
  });
};

/**
 */

var checkSSLSupport = function (okUrl, complete) {

  if (process.browser && location.protocol === "https:") return complete(true);

  hurryup(function (complete) {

    try {
      sa.
      get(okUrl).
      end(function (err, response) {
        if (err || !/^20/.test(String(response.status))) {
          return complete(void 0, false);
        } else {
          return complete(void 0, true);
        }
      });

    // IE throws an exception here
    } catch (e) {
      return complete(void 0, false);
    }

  }, 1000 * 8).call(void 0, function (err, supportsSSL) {
    complete(!err && supportsSSL);
  });
  
};

if (process.browser) {
  checkSSLSupport = memoizeByStorage(async.memoize(checkSSLSupport));
}

/**
 */

function memoizeByStorage (fn) {
  var store = require("store");

  return function (okUrl, complete) {

    var key = "supports-ssl-" + encodeURIComponent(okUrl),
    data;

    if ((data = store.get(key)) && data.createdAt > Date.now() - 86400000) return complete.apply(this, data.args);


    fn(okUrl, function () {

      store.set(key, {
        args: args = Array.prototype.slice.call(arguments, 0),
        createdAt: Date.now()
      });

      complete.apply(this, args);
    });
  }
}

/**
 */

function fixUrls (okUrl, reqUrl) {

  var okUrlParts = Url.parse(okUrl),
  reqUrlParts    = Url.parse(reqUrl);

  // make it ssl - need the check
  okUrlParts.protocol = "https:"

  // sync them up
  for (var key in okUrlParts) {
    okUrlParts[key] = okUrlParts[key] || reqUrlParts[key];
    reqUrlParts[key] = reqUrlParts[key] || okUrlParts[key];
  }

  okUrlParts.query = okUrlParts.hash = okUrlParts.search = void 0;

  return {
    okUrl: Url.format(okUrlParts),
    reqUrl: Url.format(reqUrlParts)
  };
}
