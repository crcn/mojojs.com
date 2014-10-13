window?.cdn = ""

unless console?
  window?.console =
    log   : () ->
    error : () ->
    warn  : () ->
    trace : () ->


if process.browser
  require "./logger"

  window.jQuery = window.$ = require("jquery");
  require("jquery.transit");
  require("./segment");
  require("jquery.placeholder");
  require("loggly");
  # require("./heap");

  
  require("requestAnimationFrame");
  require("bootstrap");
  window.platform = require("platform");