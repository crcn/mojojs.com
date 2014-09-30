if process.browser
  Spinner = require "spin"
views = require "mojo-views"


class SpinnerView extends views.Base
  paper: require("./index.pc")
  bindings:
    "show": (show) ->
      return unless process.browser

      unless @_div
        @_div = document.createElement "div"

        new Spinner({
          lines: 10,
          length: 6,
          width: 5,
          radius: 20,
          color: "#57a257"
        }).spin(@_div)

      if show
        @set "content", @_div
      else
        @set "content", undefined


module.exports = SpinnerView